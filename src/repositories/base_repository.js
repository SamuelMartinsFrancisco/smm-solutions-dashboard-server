import { query } from "../config/database.js";
import { nanoid } from "nanoid";
import { BadRequestError } from "../utils/errorHandlers.js";

export default class BaseRepository {
  constructor(tableName, availableFields) {
    this.table = tableName
    this.fields = availableFields
  }

  mapInputs(data) {
    const properties = Object.keys(data);
    const unavailableFields = [];
    properties.forEach(
      (prop) => {
        if (
          prop === 'id' 
          || !this.fields.includes(prop)
        ) unavailableFields.push(prop);
      }
    );

    if (unavailableFields.length) {
      const message = "the following fields can't be edited or don't exists: " + unavailableFields.toString().replace(',', ', ');
      throw new BadRequestError(message);
    }

    const placeholders = properties.map((_, count) => `$${count + 1}`)

    return {
      properties: properties.join(', '),
      values: Object.values(data),
      placeholders: placeholders.join(', '),
    }
  }

  async findAll() {
    const { rows } = await query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async findById(id) {
    const { rows } = await query(
      `SELECT * FROM ${this.table} WHERE id = $1`,
      [id]
    );

    return rows[0];
  }

  async create(data) {
    const { properties, values, placeholders } = this.mapInputs(data);

    const text = `INSERT INTO ${this.table}(${properties}, id) VALUES (${placeholders}, $${values.length + 1}) RETURNING *`;

    const { rows } = await query(text, [...values, nanoid(8)]);

    return rows[0];
  }

  async update(data, id) {
    const { properties, values } = this.mapInputs(data);

    const setClauses = properties.split(', ')
      .map((prop, index) => `${prop} = $${index + 1}`)
      .join(', ');

    const text = `UPDATE ${this.table} SET ${setClauses} WHERE id = $${values.length + 1} RETURNING *`;

    const { rows } = await query(text, [...values, id]);

    return rows[0];
  }

  async delete(id) {
    await query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
    return true;
  }
}