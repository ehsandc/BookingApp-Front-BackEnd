import { z } from "zod";

// User validation schemas
export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(6).max(100),
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    pictureUrl: z.string().url().optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(50).optional(),
    password: z.string().min(6).max(100).optional(),
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    pictureUrl: z.string().url().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Host validation schemas
export const createHostSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(6).max(100),
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    pictureUrl: z.string().url().optional(),
    aboutMe: z.string().max(1000).optional(),
  }),
});

export const updateHostSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(50).optional(),
    password: z.string().min(6).max(100).optional(),
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    pictureUrl: z.string().url().optional(),
    aboutMe: z.string().max(1000).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Property validation schemas
export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(2000),
    location: z.string().min(1).max(200),
    pricePerNight: z.number().positive(),
    bedroomCount: z.number().int().min(0).max(50),
    bathRoomCount: z.number().int().min(0).max(50),
    maxGuestCount: z.number().int().min(1).max(100),
    hostId: z.string().uuid(),
    rating: z.number().int().min(1).max(5).optional(),
    image: z.string().url().optional(),
  }),
});

export const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().min(1).max(2000).optional(),
    location: z.string().min(1).max(200).optional(),
    pricePerNight: z.number().positive().optional(),
    bedroomCount: z.number().int().min(0).max(50).optional(),
    bathRoomCount: z.number().int().min(0).max(50).optional(),
    maxGuestCount: z.number().int().min(1).max(100).optional(),
    hostId: z.string().uuid().optional(),
    rating: z.number().int().min(1).max(5).optional(),
    image: z.string().url().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Booking validation schemas
export const createBookingSchema = z
  .object({
    body: z.object({
      userId: z.string().uuid(),
      propertyId: z.string().uuid(),
      checkinDate: z.string().datetime(),
      checkoutDate: z.string().datetime(),
      numberOfGuests: z.number().int().min(1).max(100),
      totalPrice: z.number().positive(),
      bookingStatus: z.enum(["confirmed", "pending", "cancelled"]).optional(),
    }),
  })
  .refine(
    (data) =>
      new Date(data.body.checkoutDate) > new Date(data.body.checkinDate),
    {
      message: "Checkout date must be after checkin date",
      path: ["body", "checkoutDate"],
    }
  );

export const updateBookingSchema = z.object({
  body: z.object({
    checkinDate: z.string().datetime().optional(),
    checkoutDate: z.string().datetime().optional(),
    numberOfGuests: z.number().int().min(1).max(100).optional(),
    totalPrice: z.number().positive().optional(),
    bookingStatus: z.enum(["confirmed", "pending", "cancelled"]).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Review validation schemas
export const createReviewSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    propertyId: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(1).max(1000),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().min(1).max(1000).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Auth validation schemas
export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  }),
});

// Common parameter validation
export const idParamSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
