import "reflect-metadata";
import {createConnection} from "typeorm";
import {Photo} from "./entity/Photo";

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "develop",
    password: "develop",
    database: "test",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true,
    logging: false
}).then( async connection => {

    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;

    await connection.manager.save(photo);
    console.log("Photo has been saved. Photo id is", photo.id);

    let savedPhotos = await connection.manager.find(Photo);
    console.log("All photos from the db: ", savedPhotos);
}).catch(error => console.log(error));