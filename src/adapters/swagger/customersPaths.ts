export const customerPath = {
  "/api/customers/cpf": {
    get: {
      tags: ["Idendification"],
      summary: "Idendification customer by CPF",
      parameters: [
        {
          name: "cpf",
          in: "query",
          description: "Cpf Number",
          required: true,
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
          description: "Customers not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },

  "/api/customers": {
    post: {
      tags: ["Customers"],
      summary: "Register Customers",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                cpf: {
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
      tags: ["Customers"],
      summary: "List customers",
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
          description: "List Customers not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
}
