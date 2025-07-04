import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// Get all products
export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        include: [{
          model: User,
          attributes: ["uuid", "name", "email"] // tambah uuid di sini
        }]
      });
    } else {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        where: { userId: req.userId },
        include: [{
          model: User,
          attributes: ["uuid", "name", "email"]
        }]
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get single product by uuid
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { uuid: req.params.id }
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: { id: product.id },
        include: [{
          model: User,
          attributes: ["uuid", "name", "email"]
        }]
      });
    } else {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }]
        },
        include: [{
          model: User,
          attributes: ["uuid", "name", "email"]
        }]
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Product.create({
      name,
      price,
      userId: req.userId
    });
    res.status(201).json({ msg: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { uuid: req.params.id }
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { name, price } = req.body;

    if (req.role === "admin") {
      await Product.update({ name, price }, {
        where: { id: product.id }
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Akses terlarang" });

      await Product.update({ name, price }, {
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }]
        }
      });
    }

    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { uuid: req.params.id }
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Product.destroy({
        where: { id: product.id }
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Akses terlarang" });

      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }]
        }
      });
    }

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};