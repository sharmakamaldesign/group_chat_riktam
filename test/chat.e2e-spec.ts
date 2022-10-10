import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, LoggerService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import { databaseProviders } from '../src/common/database/database.provider';
import {
   token
} from './test-data';

jest.setTimeout(30000);
class TestLogger implements LoggerService {
    log(message: string) {}
    error(message: string, trace: string) {}
    warn(message: string) {}
    debug(message: string) {}
    verbose(message: string) {}
}

describe('Slot Module', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
            providers: databaseProviders
        }).compile();

        app = module.createNestApplication();
        // app.useGlobalPipes(new ValidationPipe());
        app.useLogger(new TestLogger())
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });
    it('login', async () => {

        let obj = {
                "mobile": "0000000001",
                "password": "test1234"
        }

        const res = await request(app.getHttpServer())
        .post(`/auth/login`)
        .send(obj)
        // .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .then((res) => {
            let body = res.body;
            console.log("login unit test body====>", body);
            expect(body).toBeDefined();
            expect(201)
        });
    });

    it('get role', async () => {

        const res = await request(app.getHttpServer())
        .get(`/master/role`)
        // .send(obj)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
            let body = res.body;
            console.log("get master roles unit test body====>", body);
            expect(body).toBeDefined();
            expect(200)
        });
    });

    it('get users', async () => {

        const res = await request(app.getHttpServer())
        .get(`/user`)
        // .send(obj)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
            let body = res.body;
            console.log("get users unit test body====>", body);
            expect(body).toBeDefined();
            expect(200)
        });
    });

    it('get user by id', async () => {

        const res = await request(app.getHttpServer())
        .get(`/user/773d03bb-7518-40f7-af89-28adc5f85353`)
        // .send(obj)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
            let body = res.body;
            console.log("get user by id unit test body====>", body);
            expect(body).toBeDefined();
            expect(200)
        });
    });

//     it('update doctor', async () => {

//         let obj = {
//                 "reg_no": "test2",
//                 "name": "test",
//                 "birth_year": 1997,
//                 "dob": "string",
//                 "practicing_since": 7,
//                 "qualification": "string",
//                 "reg_council": "string",
//                 "id":"bdc69955-d692-40f4-8a2d-f7a02588c67d"
              
//         }

//         const res = await request(app.getHttpServer())
//         .post(`/doctor/update`)
//         .send(obj)
//         .set('Authorization', `Bearer ${token}`)
//         .expect(201)
//         .then((res) => {
//             let body = res.body;
//             console.log("update doctor unit test body====>", body);
//             expect(body).toBeDefined();
//             expect(body.statusCode).toEqual(200)
//         });
//     });

//     it('add-speciality-mapping to doctor', async () => {

//         let obj = {
//             "speciality_id": "0eeedcd4-4913-4982-b0d8-62a3b073ac63",
//             "doctor_id": "bdc69955-d692-40f4-8a2d-f7a02588c67d"
//         }
              
//         const res = await request(app.getHttpServer())
//         .post(`/doctor/add-speciality-mapping`)
//         .send(obj)
//         .set('Authorization', `Bearer ${token}`)
//         .expect(201)
//         .then((res) => {
//             let body = res.body;
//             console.log("update doctor unit test body====>", body);
//             expect(body).toBeDefined();
//             expect(body.statusCode).toEqual(200)
//         });
//     });

//     it('get_doctor_list', async () => {

//         const res = await request(app.getHttpServer())
//         .get(`/doctor`)
//         .set('Authorization', `Bearer ${token}`)
//         .expect(200)
//         .then((res) => {
//             let body = res.body;
//             console.log("doctor list====>", body);
//             expect(body).toBeDefined();
//             expect(body.statusCode).toEqual(200)
//         });
//     });

//     //TODO issue in add-my-speciality-mapping API
//     // it('add-my-speciality-mapping to doctor', async () => {
//     //     let obj = {
//     //         "speciality_id": "0eeedcd4-4913-4982-b0d8-62a3b073ac63"
//     //     }
              
//     //     const res = await request(app.getHttpServer())
//     //     .post(`/doctor/add-my-speciality-mapping`)
//     //     .send(obj)
//     //     .set('Authorization', `Bearer ${token}`)
//     //     .expect(201)
//     //     .then((res) => {
//     //         let body = res.body;
//     //         console.log("add-my-speciality-mappint unit test body====>", body);
//     //         expect(body).toBeDefined();
//     //         expect(body.statusCode).toEqual(200)
//     //     });
//     // });


//     it('add-lang-mapping to doctor', async () => {
//         let obj = {
//             "name": "Hindi",
//             "doctor_id": "bdc69955-d692-40f4-8a2d-f7a02588c67d"
//         }
              
//         const res = await request(app.getHttpServer())
//         .post(`/doctor/add-lang-mapping`)
//         .send(obj)
//         .set('Authorization', `Bearer ${token}`)
//         .expect(201)
//         .then((res) => {
//             let body = res.body;
//             console.log("add-lang-mapping unit test body====>", body);
//             expect(body).toBeDefined();
//             expect(body.statusCode).toEqual(200)
//         });
//     });
    
//     //TODO issue in this API
//     // it('add-my-lang-mapping to doctor', async () => {
//     //     let obj = {
//     //         "name": "Hindi"
//     //     }
              
//     //     const res = await request(app.getHttpServer())
//     //     .post(`/doctor/add-my-lang-mapping`)
//     //     .send(obj)
//     //     .set('Authorization', `Bearer ${token}`)
//     //     .expect(201)
//     //     .then((res) => {
//     //         let body = res.body;
//     //         console.log("add-my-lang-mapping unit test body====>", body);
//     //         expect(body).toBeDefined();
//     //         expect(body.statusCode).toEqual(200)
//     //     });
//     // });


//     it('get-search-autocomplete to doctor', async () => {
//         let search_term ="radiol"
//         const res = await request(app.getHttpServer())
//         .get(`/doctor/get-search-autocomplete?search_term=${search_term}`)
//         .set('Authorization', `Bearer ${token}`)
//         .expect(200)
//         .then((res) => {
//             let body = res.body;
//             console.log("get-search-autocomplete unit test body====>", body);
//             expect(body).toBeDefined();
//             expect(body.statusCode).toEqual(200)
//         });
//     });


//     it('get doctor by id', async () => {
//         let doctor_id ="bdc69955-d692-40f4-8a2d-f7a02588c67d"
//         const res = await request(app.getHttpServer())
//         .get(`/doctor/${doctor_id}`)
//         .set('Authorization', `Bearer ${token}`)
//         .expect(200)
//         .then((res) => {
//             let body = res.body;
//             console.log("get doctor by id unit test body====>", body);
//             expect(body).toBeDefined();
//             expect(body.statusCode).toEqual(200)
//         });
//     });

//     //TODO need to understand
//     // it('get-my-profile (doctor)', async () => {
//     //     const res = await request(app.getHttpServer())
//     //     .get(`/doctor/get-my-profile`)
//     //     .set('Authorization', `Bearer ${token}`)
//     //     .expect(200)
//     //     .then((res) => {
//     //         let body = res.body;
//     //         console.log("get-my-profile (doctor) unit test body====>", body);
//     //         expect(body).toBeDefined();
//     //         expect(body.statusCode).toEqual(200)
//     //     });
//     // });
});