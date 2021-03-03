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

    let photoRepository = connection.getRepository(Photo);

    await photoRepository.save(photo);
    console.log("Photo has been saved");

    let allPhotos = await photoRepository.find();
    console.log("All photos from the db: ", allPhotos);

    let firstPhoto = await photoRepository.findOne(1);
    console.log("First photo from the db: ", firstPhoto);

    let meAndBearsPhoto = await photoRepository.findOne({ name: "Me and Bears" });
    console.log("Me and Bears photo from the db: ", meAndBearsPhoto);

    let allViewedPhotos = await photoRepository.find({ views: 1 });
    console.log("All viewed photos: ", allViewedPhotos);

    let allPublishedPhotos = await photoRepository.find({ isPublished: true });
    console.log("All published photos: ", allPublishedPhotos);

    {
        let [allPhotos, photosCount] = await photoRepository.findAndCount();
        console.log("All photos: ", allPhotos);
        console.log("Photos count: ", photosCount);
    }

    let photoToUpdate = await photoRepository.findOne(1);
    photoToUpdate.name = "Me, my friends and polar bears";
    await photoRepository.save(photoToUpdate);

    let photoToRemove = await photoRepository.findOne(2);
    await photoRepository.remove(photoToRemove);
}).catch(error => console.log(error));