import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking API",
      version: "1.0.0",
      description:
        "A professional booking application API with user management, property listings, and booking functionality.",
      contact: {
        name: "API Support",
        email: "support@bookingapp.com",
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? process.env.API_URL || "https://your-api.onrender.com"
            : "http://localhost:3000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["username", "password", "name", "email"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique user identifier",
            },
            username: {
              type: "string",
              minLength: 3,
              maxLength: 50,
              description: "Unique username",
            },
            password: {
              type: "string",
              minLength: 6,
              maxLength: 100,
              description: "User password (hashed)",
            },
            name: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              description: "User full name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            phoneNumber: {
              type: "string",
              description: "User phone number",
            },
            pictureUrl: {
              type: "string",
              format: "uri",
              description: "User profile picture URL",
            },
          },
        },
        Host: {
          type: "object",
          required: ["username", "password", "name", "email"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            username: {
              type: "string",
              minLength: 3,
              maxLength: 50,
            },
            password: {
              type: "string",
              minLength: 6,
              maxLength: 100,
            },
            name: {
              type: "string",
              minLength: 1,
              maxLength: 100,
            },
            email: {
              type: "string",
              format: "email",
            },
            phoneNumber: {
              type: "string",
            },
            pictureUrl: {
              type: "string",
              format: "uri",
            },
            aboutMe: {
              type: "string",
              maxLength: 1000,
              description: "Host description",
            },
          },
        },
        Property: {
          type: "object",
          required: [
            "title",
            "description",
            "location",
            "pricePerNight",
            "bedroomCount",
            "bathRoomCount",
            "maxGuestCount",
            "hostId",
          ],
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            title: {
              type: "string",
              minLength: 1,
              maxLength: 200,
            },
            description: {
              type: "string",
              minLength: 1,
              maxLength: 2000,
            },
            location: {
              type: "string",
              minLength: 1,
              maxLength: 200,
            },
            pricePerNight: {
              type: "number",
              minimum: 0.01,
            },
            bedroomCount: {
              type: "integer",
              minimum: 0,
              maximum: 50,
            },
            bathRoomCount: {
              type: "integer",
              minimum: 0,
              maximum: 50,
            },
            maxGuestCount: {
              type: "integer",
              minimum: 1,
              maximum: 100,
            },
            hostId: {
              type: "string",
              format: "uuid",
            },
            rating: {
              type: "integer",
              minimum: 1,
              maximum: 5,
            },
            image: {
              type: "string",
              format: "uri",
            },
          },
        },
        Booking: {
          type: "object",
          required: [
            "userId",
            "propertyId",
            "checkinDate",
            "checkoutDate",
            "numberOfGuests",
            "totalPrice",
          ],
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            userId: {
              type: "string",
              format: "uuid",
            },
            propertyId: {
              type: "string",
              format: "uuid",
            },
            checkinDate: {
              type: "string",
              format: "date-time",
            },
            checkoutDate: {
              type: "string",
              format: "date-time",
            },
            numberOfGuests: {
              type: "integer",
              minimum: 1,
              maximum: 100,
            },
            totalPrice: {
              type: "number",
              minimum: 0.01,
            },
            bookingStatus: {
              type: "string",
              enum: ["confirmed", "pending", "cancelled"],
            },
          },
        },
        Review: {
          type: "object",
          required: ["userId", "propertyId", "rating", "comment"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            userId: {
              type: "string",
              format: "uuid",
            },
            propertyId: {
              type: "string",
              format: "uuid",
            },
            rating: {
              type: "integer",
              minimum: 1,
              maximum: 5,
            },
            comment: {
              type: "string",
              minLength: 1,
              maxLength: 1000,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
            },
            details: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/services/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
