const db = require('../../database/db');

const resolvers = {
  Query: {
    // SELECTS
    getPoets: async () => {
      return await db.select().from('Poet');
    },

    getPoems: async () => {
      return await db.select().from('Poem');
    },

    getCustomers: async () => {
      return await db.select().from('Customer');
    },

    getPublications: async () => {
      return await db.select().from('Publication');
    },

    getSales: async () => {
      return await db.select().from('Sale');
    },

    // PROCEDIMIENTO ALMACENADO
    getPoetsWithPoems: async () => {
      const result = await db.raw('CALL get_poets_with_poems()');
      return result[0][0];
    },
  },

  Mutation: {
    // ALTAS
    addPoet: async (_, { first_name, surname, address, postcode, telephone_number }) => {
      const [poet_code] = await db('Poet').insert({ first_name, surname, address, postcode, telephone_number });
      return await db('Poet').where({ poet_code }).first();
    },

    addPoem: async (_, { poem_title, poem_contents, poet_code }) => {
      const [poem_code] = await db('Poem').insert({ poem_title, poem_contents, poet_code });
      return await db('Poem').where({ poem_code }).first();
    },

    addCustomer: async (_, { first_name, surname, address, postcode, telephone_number }) => {
      const [customer_code] = await db('Customer').insert({ first_name, surname, address, postcode, telephone_number });
      return await db('Customer').where({ customer_code }).first();
    },

    addPublication: async (_, { title, price }) => {
      const [publication_code] = await db('Publication').insert({ title, price });
      return await db('Publication').where({ publication_code }).first();
    },

    addSale: async (_, { date, amount, customer_code }) => {
      const [sale_code] = await db('Sale').insert({ date, amount, customer_code });
      return await db('Sale').where({ sale_code }).first();
    },

    // ACTUALIZACIONES
    updatePoet: async (_, { poet_code, first_name, surname, address, postcode, telephone_number }) => {
      await db('Poet').where({ poet_code }).update({ first_name, surname, address, postcode, telephone_number });
      return await db('Poet').where({ poet_code }).first();
    },

    updatePoem: async (_, { poem_code, poem_title, poem_contents, poet_code }) => {
      await db('Poem').where({ poem_code }).update({ poem_title, poem_contents, poet_code });
      return await db('Poem').where({ poem_code }).first();
    },

    updateCustomer: async (_, { customer_code, first_name, surname, address, postcode, telephone_number }) => {
      await db('Customer').where({ customer_code }).update({ first_name, surname, address, postcode, telephone_number });
      return await db('Customer').where({ customer_code }).first();
    },

    updatePublication: async (_, { publication_code, title, price }) => {
      await db('Publication').where({ publication_code }).update({ title, price });
      return await db('Publication').where({ publication_code }).first();
    },

    updateSale: async (_, { sale_code, date, amount, customer_code }) => {
      await db('Sale').where({ sale_code }).update({ date, amount, customer_code });
      return await db('Sale').where({ sale_code }).first();
    },

    // ELIMINACIONES
    deletePoet: async (_, { poet_code }) => {
      await db('Poet').where({ poet_code }).del();
      return `Poeta con código ${poet_code} eliminado correctamente.`;
    },

    deletePoemPublication: async (_, { poem_code, publication_code }) => {
      await db('Poem_Publication').where({ poem_code, publication_code }).del();
      return `Relación Poem_Publication eliminada correctamente.`;
    },

    deleteSalePublication: async (_, { sale_code, publication_code }) => {
      await db('Sale_Publication').where({ sale_code, publication_code }).del();
      return `Relación Sale_Publication eliminada correctamente.`;
    },
  },
};

module.exports = resolvers;
