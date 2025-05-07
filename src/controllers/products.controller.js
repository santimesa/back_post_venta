import { getConnection } from "../database/connection";
import sql from 'mssql';

export const getProducts = async (req,res)=>{
    const pool=  await getConnection();
    const result = await pool.request().query('select * from PRODUCT');
    console.log(result);
    res.json(result.recordset);
};

export const createNewProduct = async (req, res) => {
    console.log(req);
    const { nameProduct, priceProduct, idCategory } = req.body;

    if (nameProduct == null || priceProduct == null) {
        return res.status(400).json({ "msg": "Datos incompletos" });
    }
    console.log("INGESO PARA INSERTAR ");
    try {
        const pool = await getConnection();
        await pool.request()
            .input("nameProduct", sql.VarChar, nameProduct)
            .input("priceProduct", sql.Decimal, priceProduct)
            .input("idCategory", sql.Decimal, idCategory)
            .query('INSERT INTO PRODUCT(nameProduct, priceProduct, idCategory) VALUES (@nameProduct, @priceProduct,@idCategory)');

            res.json({ msg: "Nuevo Producto Creado" });
    } catch (error) {
        // Manejar cualquier error de conexión o consulta aquí
        console.error("Error al insertar el producto:", error);
        res.status(500).json({ "msg": "Error interno del servidor" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ msg: "ID de producto requerido" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM PRODUCT WHERE idProduct = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        res.json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};
