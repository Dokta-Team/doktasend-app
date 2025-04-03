// src/app/(models)/admin-schema.js
export const adminDashboardSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Admin Dashboard Data Schema",
  description: "Schema for the admin dashboard data",
  type: "object",
  properties: {
    accessKeyVerification: {
      type: "object",
      description: "Section for admin access key verification",
      properties: {
        accessKeyInput: {
          type: "string",
          description: "Input field for access key",
        },
        verifyButton: {
          type: "string",
          description: "Button to verify access key",
        },
        errorMessage: {
          type: "string",
          description: "Error message for invalid access key",
        },
      },
      required: ["accessKeyInput", "verifyButton"],
    },
    recipientsDashboard: {
      type: "object",
      description: "Dashboard section displaying recipient details",
      properties: {
        recipientsTable: {
          type: "object",
          description: "Table displaying recipient data",
          properties: {
            headers: {
              type: "array",
              items: { type: "string" },
              description: "Headers for the recipients table",
            },
            rows: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer", description: "Recipient ID" },
                  username: {
                    type: "string",
                    description: "Recipient Username",
                  },
                  lastActive: {
                    type: "string",
                    format: "date-time",
                    description: "Last active timestamp",
                  },
                  // Excluding personal details as requested
                },
                required: ["id", "username", "lastActive"],
              },
              description: "Rows of recipient data",
            },
          },
          required: ["headers", "rows"],
        },
      },
      required: ["recipientsTable"],
    },
  },
  required: ["accessKeyVerification", "recipientsDashboard"],
};
