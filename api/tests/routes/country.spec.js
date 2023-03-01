/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn, } = require('../../src/db.js');
const request = require('supertest');
const { Activity } = require('../../src/db')


describe('GET /countries', function() {

  beforeEach(function() {
    testSession = session(app); // Inicializa una nueva sesión de prueba para cada test
  });

  it('Debería obtener todos los países de la base de datos', async function() {
    const response = await request(app)
      .get('/countries')
      .expect(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(250); // Cambiar el valor de acuerdo a los datos de prueba que se hayan cargado
  });

  it('Debería obtener un país por su nombre', async function() {
    const response = await request(app)
      .get('/countries?name=Argentina')
      .expect(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0].name).to.equal('Argentina');
  });

  it('Debería obtener un país por su nombre incluso si se escribe con maysuculas y minusculas', async function() {
    const response = await request(app)
      .get('/countries?name=cUbA')
      .expect(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0].name).to.equal('Cuba');
  });

  it('Debería devolver un error 404 si se busca un país que no existe', async function() {
    const response = await request(app)
      .get('/countries?name=PaísInexistente')
      .expect(404);
    expect(response.body.msg).to.equal('No se encontro pais con el nombre: PaísInexistente');
  });
});

describe('GET /countries/:id', function () {

  beforeEach(function() {
    testSession = session(app); // Inicializa una nueva sesión de prueba para cada test
  });

  it('Debería devolver un error 400 si se proporciona un ID inválido', async function () {
    const response = await request(app)
          .get('/countries/123456')
          .expect(400);
          expect(response.body.msg).to.equal('El ID no es válido');
  });

  it('Debería devolver el país si el ID es válido', async function () {
    await request(app)
          .get('/countries/arg')
          .expect(200)
          .then(res => {
              expect(res.body.name).to.equal('Argentina');
          });
  });

  it('Debería devolver el país si el ID es válido incluso con combinacion de min y mayusculas', async function () {
    await request(app)
          .get('/countries/MeX')
          .expect(200)
          .then(res => {
              expect(res.body.name).to.equal('Mexico');
          });
  });

  it('Debería devolver un error 404 si no se encuentra ningún país con el ID proporcionado', async function () {
    await request(app)
          .get('/countries/xaw')
          .expect(404)
          .then(res => {
              expect(res.body.msg).to.equal('No se encontro pais con el id: xaw');
          });
  });
  it('Devuelve las actividades de un país en especifico en caso que tenga', async function () {
        await session(app)
          .post('/activities')
          .send({
          name: 'Test',
          difficulty: 3,
          duration: 2,
          season: 'Invierno',
          country: 'Cuba'
        });
        const response = await session(app)
          .get('/countries/cub')
          .expect(200);
          expect(response.body.Activities[0].name).to.equal('Test');
  });
});

describe('POST /activities', () => {
  it('Debería devolver un status 201 y un mensaje de:  "Actividad creada con exito"', async () => {
    const response = await session(app)
      .post('/activities')
      .send({
        name: 'Caminata por el Bosque',
        difficulty: 3,
        duration: 2,
        season: 'Invierno',
        country: 'Argentina'
      });
    
    expect(response.status).to.equal(201);
    expect(response.body.msg).to.equal('Actividad creada con exito');
  });

  it('Deberia devolver un error 400 y un mensaje con: "Faltan parametros" cuando no esten todos los parametros', async () => {
    const response = await session(app)
      .post('/activities')
      .send({
        name: 'Caminata en el Bosque',
        duration: 2,
        season: 'Invierno',
      });
    
    expect(response.status).to.equal(400);
    expect(response.body.msg).to.equal('Faltan parametros');
  });

  it('Deveria devolver un error 404 y un mensaje de: la dificultad debe de ser entre 1 y 5', async () => {
    const response = await session(app)
      .post('/activities')
      .send({
        name: 'Caminata en el Bosque',
        difficulty: 6,
        duration: 2,
        season: 'Invierno',
        country: 'Argentina'
      });
    
    expect(response.status).to.equal(400);
    expect(response.body.msg).to.equal('La dificultad tiene que estar entre 1 y 5');
  });

  it('Debería respender con un error 400 si se ingresa una estacion no valida', async () => {
    const response = await testSession
      .post('/activities')
      .send({
        name: 'Caminata en el Bosque',
        difficulty: 3,
        duration: 2,
        season: 'Veranito',
        country: 'Argentina'
      });
    
    expect(response.status).to.equal(400);
    expect(response.body.msg).to.equal('La estacion no es valdia');
  });
});

describe('GET /activities', () => {
  const testSession = session(app);

  it('Retorna todas las actividades', async () => {
    const res = await testSession.get('/activities');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('Retorna error 400 si no encuentra actividades creadas', async () => {

    await Activity.destroy({where: {}});

    const res = await testSession.get('/activities');
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('msg', 'No hay activiades creadas');
  });
});