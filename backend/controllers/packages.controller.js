const { Package } = require('../models');

// Obtener todos los paquetes
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.json(packages);
  } catch (error) {
    console.error('Error al obtener paquetes:', error);
    res.status(500).json({ message: 'Error al obtener paquetes' });
  }
};

// Obtener un paquete por ID
exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findByPk(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    res.json(package);
  } catch (error) {
    console.error('Error al obtener paquete:', error);
    res.status(500).json({ message: 'Error al obtener paquete' });
  }
};

// Crear un nuevo paquete (solo admin)
exports.createPackage = async (req, res) => {
  try {
    const { title, description, location, price, image_url } = req.body;
    const newPackage = await Package.create({
      title,
      description,
      location,
      price,
      image_url
    });
    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error al crear paquete:', error);
    res.status(500).json({ message: 'Error al crear paquete' });
  }
};

// Actualizar un paquete (solo admin)
exports.updatePackage = async (req, res) => {
  try {
    const { title, description, location, price, image_url } = req.body;
    const package = await Package.findByPk(req.params.id);
    
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    
    await package.update({
      title,
      description,
      location,
      price,
      image_url
    });
    
    res.json(package);
  } catch (error) {
    console.error('Error al actualizar paquete:', error);
    res.status(500).json({ message: 'Error al actualizar paquete' });
  }
};

// Eliminar un paquete (solo admin)
exports.deletePackage = async (req, res) => {
  try {
    const package = await Package.findByPk(req.params.id);
    
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    
    await package.destroy();
    res.json({ message: 'Paquete eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar paquete:', error);
    res.status(500).json({ message: 'Error al eliminar paquete' });
  }
};