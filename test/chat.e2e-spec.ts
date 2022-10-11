import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, LoggerService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import { databaseProviders } from '../src/common/database/database.provider';
import {
    admin_token,
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
    let newGroupId;
    let newChatIt;
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

    it('create User', async () => {

        let obj ={
            "name": "Kabir",
            "role_id": "612722b3-b8db-43eb-9db5-d0448b9d17f4",
            "email": "kabir.@gmail.com",
            "password": "test1234",
            "gender": "male",
            "mobile": "0000000005"
          }

        const res = await request(app.getHttpServer())
        .post(`/user`)
        .send(obj)
        .set('Authorization', `Bearer ${admin_token}`)
        .expect(201)
        .then((res) => {
            let body = res.body;
            console.log("create User test body====>", body);
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

    it('create chat group', async () => {

        let obj ={
            "name": "New Year",
            "code": "new_year2010",
          }

        const res = await request(app.getHttpServer())
        .post(`/chat/group`)
        .send(obj)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .then((res) => {
            let body = res.body;
            newGroupId = body.id
            console.log("create chat grout test body====>", body);
            expect(body).toBeDefined();
            expect(201)
        });
    });


    it('get chat groups', async () => {

        const res = await request(app.getHttpServer())
        .get(`/chat/group`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
            let body = res.body;
            console.log("get chat groups unit test body====>", body);
            expect(body).toBeDefined();
            expect(200)
        });
    });

    it('add user to chat group', async () => {

        let obj ={
            "user_id": "89182a1f-b7c0-454b-8136-babe897e575a",
            "group_id": newGroupId
          }

        const res = await request(app.getHttpServer())
        .post(`/chat/group/user`)
        .send(obj)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .then((res) => {
            let body = res.body;
            console.log("add user to chat group test body====>", body);
            expect(body).toBeDefined();
            expect(201)
        });
    });

    it('send chat message', async () => {

        let obj ={
            "message": "Hello there!",
            "group_id": newGroupId
          }
        
        console.log("send chat message "+obj.message, obj.group_id);

        const res = await request(app.getHttpServer())
        .post(`/chat`)
        .send(obj)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .then((res) => {
            let body = res.body;
            newChatIt = body.id;
            console.log("send chat message test body====> ", body);
            expect(body).toBeDefined();
            expect(201)
        });
    });

    it('get users of a chat group', async () => {
        console.log("new group id: "+newGroupId);
        const res = await request(app.getHttpServer())
        .get(`/chat/group/users/`+newGroupId)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
            let body = res.body;
            console.log("get users of a chat group unit test body====>", body);
            expect(body).toBeDefined();
            expect(200)
        });
    });

    it('get chats of group', async () => {

        const res = await request(app.getHttpServer())
        .get(`/chat/`+newGroupId)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
            let body = res.body;
            console.log("get chats of groups unit test body====>", body);
            expect(body).toBeDefined();
            expect(200)
        });
    });

    it('like chat message', async () => {

        let obj ={
            "chat_id": newChatIt,
          }
        
        const res = await request(app.getHttpServer())
        .post(`/chat/like`)
        .send(obj)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .then((res) => {
            let body = res.body;
            console.log("like chat message test body====> ", body);
            expect(body).toBeDefined();
            expect(201)
        });
    });

    it('get likes of a chat', async () => {

        const res = await request(app.getHttpServer())
        .get(`/chat/like/`+newChatIt)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res) => {
            let body = res.body;
            console.log("get likes of a chat unit test body====>", body);
            expect(body).toBeDefined();
            expect(200)
        });
    });

    // it('delete chat group', async () => {
    //     console.log("new chat group id"+newGroupId);
    //     const res = await request(app.getHttpServer())
    //     .delete(`/chat/group/`+newGroupId)
    //     .set('Authorization', `Bearer ${token}`)
    //     .expect(200)
    //     .then((res) => {
    //         let body = res.body;
    //         console.log("delete chat grout test body====>", body);
    //         expect(body).toBeDefined();
    //         expect(200)
    //     });
    // });
});