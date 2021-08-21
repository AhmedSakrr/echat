import 'dotenv/config';
import { createConnection } from 'typeorm';
import faker from 'faker';
import { User } from '../entity/User';
import { Image } from '../entity/Image';
import { ENTITIES } from '../constants';
import { coinFlip, getRandomBetween } from '../utils';
import { Service } from '../entity/Service';
import { UserService } from '../entity/UserService';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    // logging: true,
    entities: [ENTITIES],
  });

  // await User.delete({});

  const services = await Service.find({ order: { popularity: 'ASC' } });
  const servicesLength = services.length;
  servicesLength;
  for (let i = 0; i < 10; i++) {
    const user = {
      type: 'user',
      fake: true,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      description: coinFlip() ? faker.lorem.text() : undefined,
      age: coinFlip() ? faker.datatype.datetime() : undefined,
      gender: coinFlip() ? faker.name.gender() : undefined,
      country: coinFlip() ? faker.internet.userName() : undefined,
      discord: coinFlip() ? faker.internet.userName() : undefined,
      twitter: coinFlip() ? faker.internet.userName() : undefined,
      facebook: coinFlip() ? faker.internet.userName() : undefined,
      snapchat: coinFlip() ? faker.internet.userName() : undefined,
      instagram: coinFlip() ? faker.internet.userName() : undefined,
      twitch: coinFlip() ? faker.internet.userName() : undefined,
      steam: coinFlip() ? faker.internet.userName() : undefined,
      tiktok: coinFlip() ? faker.internet.userName() : undefined,
    };

    const dbUser = await conn
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .returning('*')
      .execute();

    let userId: number = dbUser.raw[0].id;

    let images = [];
    images.push({
      type: 'profile',
      url: `${faker.image.imageUrl()}/${faker.datatype.uuid()}`.replace(
        'http://',
        'https://'
      ),
      publicId: `${faker.datatype.uuid()}`,
      userId,
    });
    images.push({
      type: 'cover',
      url: `${faker.image.imageUrl()}/${faker.datatype.uuid()}`.replace(
        'http://',
        'https://'
      ),
      publicId: `${faker.datatype.uuid()}`,
      userId,
    });
    images.push({
      type: 'secondary',
      url: `${faker.image.imageUrl()}/${faker.datatype.uuid()}`.replace(
        'http://',
        'https://'
      ),
      publicId: `${faker.datatype.uuid()}`,
      userId,
    });

    await conn
      .createQueryBuilder()
      .insert()
      .into(Image)
      .values(images)
      .returning('*')
      .execute();

    for (let x = 0; x < getRandomBetween(1, 4); x++) {
      let service = services[getRandomBetween(0, servicesLength)];
      if (!service.platforms) {
        console.log(service);
      }
      const userService = {
        status: true,
        level: 'Newbie',
        platforms: service.platforms ? service.platforms : undefined,
        description: coinFlip() ? faker.lorem.text() : undefined,
        price: getRandomBetween(1, 10),
        userId,
        serviceId: service.id,
        per: ['Game', '15 Min', '30 Min', '45 Min', '60 Min'][
          getRandomBetween(0, 4)
        ],
      };
      await UserService.insert(userService);
    }

    console.log(i + 1);
  }

  console.log('finished');
};
main();