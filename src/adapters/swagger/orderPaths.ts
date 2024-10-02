export const orderPaths = {
  "/api/orders/new": {
    post: {
      tags: ["Orders"],
      summary: "Create new order",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                customerId: {
                  type: "string",
                  required: true,
                },
                observation: {
                  type: "string",
                },

                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      productId: {
                        type: "string",
                        required: true,
                      },
                      productDescription: {
                        type: "string",
                      },
                      productPrice: {
                        type: "number",
                      },
                      quantity: {
                        type: "number",
                        required: true,
                      },
                    },
                  },
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
        201: {
          description: "Created",
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
  },

  "/api/orders/list": {
    get: {
      tags: ["Orders"],
      summary: "List All Orders",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Number of page",
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
          description: "List of Orders not Localized",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },

  "/api/orders/update-status": {
    put: {
      tags: ["Orders"],
      summary: "Update Status Order",
      parameters: [
        {
          name: "orderId",
          in: "query",
          description: "Number of Id Order",
          schema: {
            type: "number",
          },
        },
        {
          name: "statusId",
          in: "query",
          description: "Desciption Status",
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
          description: "Order not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },

  "/api/orders/finalize": {
    put: {
      tags: ["Orders"],
      summary: "Finalize Order",
      parameters: [
        {
          name: "orderId",
          in: "query",
          description: "Number of Id Order",
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
          description: "Order not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
}
