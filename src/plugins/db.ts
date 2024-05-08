/* eslint-disable linebreak-style */
import 'reflect-metadata';
import fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import { Product } from '../modules/products/entity';
import { Users } from '../modules/users/users.entity';

export default fp(async server => {
	try {
		const connectionOptions = await getConnectionOptions();
		Object.assign(connectionOptions, {
			options: { encrypt: true },
			entities: [Product,Users]
		});

		const connection = await createConnection(connectionOptions);
		console.log('database connected');

		server.decorate('db', {
			products: connection.getRepository(Product)
		});
	} catch (error) {
		console.log(error);
		console.log('make sure you have set .env variables - see .env.sample');
	}
});
