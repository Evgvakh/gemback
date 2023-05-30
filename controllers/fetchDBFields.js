import mysql from "mysql2";
import { dbParams } from "../DB/index.js";
import { getItems, connect, disconnect } from "../utils/index.js";

export const getCategories = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM categories`;
   
    const cats = await getItems(request, connection);
    res.json(cats);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getSubcats = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM subcategories`;    

    const subcats = await getItems(request, connection);
    res.json(subcats);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getColors = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM colors`;

    const colors = await getItems(request, connection);      
    res.json(colors); 
    
    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getOrigins = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM origin`;

    const origin = await getItems(request, connection);
    res.json(origin);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getSets = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM sets`;

    const sets = await getItems(request, connection);
    res.json(sets);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getCuts = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM cut`;

    const cuts = await getItems(request, connection);
    res.json(cuts);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getTreatments = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM treatment`;

    const treatment = await getItems(request, connection);
    res.json(treatment);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getClarities = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM clarity`;

    const clarity = await getItems(request, connection);
    res.json(clarity);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getAvails = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM available`;

    const avails = await getItems(request, connection);

    res.json(avails);
    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getSales = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT * FROM is_onsale`;

    const sales = await getItems(request, connection);

    res.json(sales);
    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};