export const productPath = {
  "/api/products": {
    post: {
      tags: ["Products"],
      summary: "Register Product",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                categoryId: {
                  type: "string",
                },
                price: {
                  type: "number",
                },
                image: {
                  type: "string",
                },
                active: {
                  type: "boolean",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Created",
        },
        200: {
          description: "Success",
        },
        400: {
          description: "Invalid Request",
        },
        401: {
          description: "Invalid Access",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    get: {
      tags: ["Products"],
      summary: "List All Products",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Page Number",
          required: true,
          default: 1,
          schema: {
            type: "number",
          },
        },
        {
          name: "limit",
          in: "query",
          description: "Limit per page",
          default: 10,
          schema: {
            type: "number",
          },
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
        400: {
          description: "Invalid Request",
        },
        401: {
          description: "Invalid Access",
        },
        404: {
          description: "Products not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    put: {
      tags: ["Products"],
      summary: "Edit Product",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                categoryId: {
                  type: "string",
                },
                price: {
                  type: "number",
                },
                image: {
                  type: "image",
                },
                active: {
                  type: "boolean",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
        },
        400: {
          description: "Invalid Request",
        },
        401: {
          description: "Invalid Access",
        },
        404: {
          description: "Product not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    delete: {
      tags: ["Products"],
      summary: "Delete Product",
      parameters: [
        {
          name: "id",
          in: "query",
          description: "Product Code",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Sucesso",
        },
        400: {
          description: "Requisição inválida",
        },
        401: {
          description: "Acesso inválido",
        },
        404: {
          description: "Produto não encontrado",
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
  "/api/products/category": {
    get: {
      tags: ["Products"],
      summary: "List Product by Category ",
      parameters: [
        {
          name: "category",
          in: "query",
          description: "Category",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "page",
          in: "query",
          description: "Page number",
          required: false,
          default: 1,
          schema: {
            type: "integer",
          },
        },

        {
          name: "limit",
          in: "query",
          description: "Limit per page",
          default: 10,
          schema: {
            type: "number",
          },
        },
      ],
      responses: {
        200: {
          description: "Success",
        },
        400: {
          description: "Invalid Request",
        },
        401: {
          description: "Invalid Access",
        },
        404: {
          description: "Product not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
}
