export const paymentPath = {
  "/api/payment": {
    post: {
      tags: ["Payment"],
      summary: "Register Payment",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                orderId: {
                  type: "string",
                },
                amount: {
                  type: "number",
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
  },
  "/api/payment-get-status": {
    get: {
      tags: ["Payment"],
      summary: "Get Status Payment of Order",
      parameters: [
        {
          name: "orderId",
          in: "query",
          description: "Number Order",
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
}
