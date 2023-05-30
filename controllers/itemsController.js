import mysql from "mysql2";
import { dbParams } from "../DB/index.js";
import { getItems, getItemsWithImages, connect, disconnect } from '../utils/index.js';
 
export const getAllItems = async (req, res) => {
  try {   
    const connection = mysql.createConnection(dbParams);
    connect(connection);
    
    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        subcategories.name AS subcategory,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment,
                        available.name AS availability,
                        is_onsale.name AS onsale
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        JOIN subcategories on items.id_subcategory = subcategories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        join available on items.id_availability = available.id
                        join is_onsale on items.id_is_onsale = is_onsale.id
                        ORDER BY id ASC`;

    const items = await getItemsWithImages(request, connection, 'images');
    res.json(items);
    
    disconnect(connection);
  } catch (err) {
    res.json(err);
  }

};

export const getCarouselItems = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        subcategories.name AS subcategory,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment,
                        available.name AS availability,
                        is_onsale.name AS onsale
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        JOIN subcategories on items.id_subcategory = subcategories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        join available on items.id_availability = available.id
                        join is_onsale on items.id_is_onsale = is_onsale.id
                        ORDER BY added DESC
                        LIMIT 6`;

    const items = await getItemsWithImages(request, connection, 'images');
    res.json(items);
    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getAllGemsByCat = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        subcategories.name AS subcategory,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment,
                        available.name AS availability,
                        is_onsale.name AS onsale
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        JOIN subcategories on items.id_subcategory = subcategories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        join available on items.id_availability = available.id
                        join is_onsale on items.id_is_onsale = is_onsale.id
                        WHERE id_category = ?`;    

    const items = await getItemsWithImages(request, connection, 'images', req.params.id);
    res.json(items);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getOneGem = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        subcategories.name AS subcategory,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment,
                        available.name AS availability,
                        is_onsale.name AS onsale
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        JOIN subcategories on items.id_subcategory = subcategories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        join available on items.id_availability = available.id
                        join is_onsale on items.id_is_onsale = is_onsale.id
                        WHERE items.id = ?`;
    const id = req.params.id;
    const items = await getItemsWithImages(request, connection, 'images', id);
    res.json(items[0]);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getGlossItems = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT glossarium.*,
                      categories.name AS category
                      FROM glossarium
                      JOIN categories on glossarium.id_category = categories.id`;    

    const items = await getItemsWithImages(request, connection, 'gloss_images');    
    res.json(items);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getOneGlossItem = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT glossarium.*,
                      categories.name AS category
                      FROM glossarium
                      JOIN categories on glossarium.id_category = categories.id
                      WHERE glossarium.id = ?`;    

    const items = await getItemsWithImages(request, connection, 'gloss_images', req.params.id);
    res.json(items[0]);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};

export const getDescription = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);
    connect(connection);

    const request = `SELECT description FROM ${req.params.table} WHERE id = ?`;

    const items = await getItems(request, connection, [req.params.id]);
    res.json(items[0].description);

    disconnect(connection);
  } catch (err) {
    res.json(err);
  }
};
