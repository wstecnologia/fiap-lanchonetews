export const categoryPath = {
  "/api/categories": {
    post: {
      tags: ["Categories"],
      summary: "Register Category",
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
      tags: ["Categories"],
      summary: "List All Categories",
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
          description: "Categories not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    put: {
      tags: ["Categories"],
      summary: "Edit Category",
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
          description: "Category not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
    delete: {
      tags: ["Categories"],
      summary: "Delete Category",
      parameters: [
        {
          name: "id",
          in: "query",
          description: "Category Code",
          required: true,
          schema: {
            type: "number",
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
          description: "Categoria não encontrada",
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },

  "/api/categories/id": {
    get: {
      tags: ["Categories"],
      summary: "List Category by Id",
      parameters: [
        {
          name: "id",
          in: "query",
          description: "Id",
          required: true,
          default: "",
          schema: {
            type: "string",
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
          description: "Category not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
}
