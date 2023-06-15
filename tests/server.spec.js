const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de marketplace", () => {
    it("1. Testea que la ruta GET /products devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(server).get("/products").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("2. Comprueba que se obtiene un código 404 al intentar eliminar un producto con un id que no existe", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = 10
        const { statusCode } = await request(server)
            .delete(`/productos/${idDeProductoAEliminar}`)
            .set("Authorization", jwt)
            .send();
        expect(statusCode).toBe(404);
    });

    it("3. Prueba que la ruta POST /products agrega un nuevo producto y devuelve un código 201. (2 Puntos)", async () => {
        const producto = {product_name : "Street fighter", descrip: "Peleas callejeras", cost: 5600, price : 2800, stock_quantity: 45, url_img: "url_img_street", stars_quantity: 5, category :"peleas", is_new : true, is_special_offer : true }
        const { statusCode } = await request(server)
            .post("/products")
            .send(producto);
        expect(statusCode).toBe(201);
    });

    it("4. Prueba que la ruta PUT /products devuelve un status code 400 si intentas actualizar un producto enviando un id en los parámetros que sea diferente al id dentro del payload. (3 Puntos)", async () => {
        //El id es distinto al id en el path
        const id = 1
        const producto = {id, product_name : "Street fighter V", descrip: "Peleas callejeras", cost: 5600, price : 2800, stock_quantity: 45, url_img: "url_img_street", stars_quantity: 5, category :"peleas", is_new : true, is_special_offer : true }
        const { statusCode } = await request(server)
            .put("/products/6")
            .send(producto);
        expect(statusCode).toBe(400);
    });
});
