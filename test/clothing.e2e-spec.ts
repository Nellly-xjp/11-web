import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { App } from 'supertest/types';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Clothing API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('rejects an unsupported size with 400 Bad Request', () => {
    return request(app.getHttpServer())
      .post('/clothing')
      .set('Authorization', 'Bearer admin-token')
      .send({
        name: 'Футболка',
        category: 'Футболки',
        size: 'XXXXXL',
        price: 799,
      })
      .expect(400);
  });

  it('creates clothing with a supported size', () => {
    return request(app.getHttpServer())
      .post('/clothing')
      .set('Authorization', 'Bearer admin-token')
      .send({
        name: 'Футболка',
        category: 'Футболки',
        size: 'L',
        price: 799,
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          name: 'Футболка',
          category: 'Футболки',
          size: 'L',
          price: 799,
        });
        expect(body.id).toBeDefined();
      });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
