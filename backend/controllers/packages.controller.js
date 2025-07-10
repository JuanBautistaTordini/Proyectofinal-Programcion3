const { Package } = require('../models');

// obtener todos los paquetes
exports.getAllPackages = async (req, res) => {
  try {
    console.log('Llamada a getAllPackages');
    const packages = await Package.findAll();
    res.json(packages);
  } catch (error) {
    console.error('Error al obtener paquetes:', error);
    res.status(500).json({ message: 'Error al obtener paquetes' });
  }
};


exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Paquete no encontrado' });

    res.json(pkg);
  } catch (error) {
    console.error('Error al obtener paquete:', error);
    res.status(500).json({ message: 'Error al obtener paquete' });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const { title, description, location, price, image_url } = req.body;
    const newPackage = await Package.create({ title, description, location, price, image_url });

    
    res.status(201).json({
      status: 'success',
      message: 'Paquete creado exitosamente',
      newpackage: newPackage
    });
  } catch (error) {
    console.error('Error al crear paquete:', error);
    res.status(500).json({ message: 'Error al crear paquete' });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const { title, description, location, price, image_url } = req.body;
    const pkg = await Package.findByPk(req.params.id);

    if (!pkg) return res.status(404).json({ message: 'Paquete no encontrado' });

    await pkg.update({ title, description, location, price, image_url });
    res.status(201).json({
      status: 'success',
      message: 'Paquete modificado exitosamente',
      modificated: pkg
    });
  } catch (error) {
    console.error('Error al actualizar paquete:', error);
    res.status(500).json({ message: 'Error al actualizar paquete' });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByPk(req.params.id);

    if (!pkg) return res.status(404).json({ message: 'Paquete no encontrado' });

    await pkg.destroy();
    res.json({ message: 'Paquete eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar paquete:', error);
    res.status(500).json({ message: 'Error al eliminar paquete' });
  }
};
