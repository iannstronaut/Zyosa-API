import { sql } from "drizzle-orm";
import {
  mysqlTable,
  char,
  varchar,
  primaryKey,
  boolean,
  timestamp,
  index,
  text,
  int,
  mysqlEnum,
  decimal,
  tinyint,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable(
  "user",
  {
    id: char("id", { length: 50 }).primaryKey(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    first_name: varchar("first_name", { length: 50 }).notNull(),
    last_name: varchar("last_name", { length: 50 }).notNull(),
    email: varchar("email", { length: 128 }).notNull().unique(),
    phone: varchar("phone", { length: 15 }),
    password: text("password").notNull(),
    image: text("image"),
    is_active: boolean("is_active").default(true),
    is_deleted: boolean("is_deleted").default(false),
    created_at: timestamp("created_at").default(sql`Now()`),
    updated_at: timestamp("updated_at")
      .default(sql`Now()`)
      .onUpdateNow(),
  },
  (table) => [
    index("username_idx").on(table.username),
    index("email_idx").on(table.email),
  ]
);

export const address = mysqlTable(
  "address",
  {
    id: int("id").autoincrement().primaryKey(),
    user_id: char("user_id", { length: 50 })
      .notNull()
      .references(() => user.id),
    address: varchar("address", { length: 255 }).notNull(),
    created_at: timestamp("created_at").default(sql`Now()`),
    updated_at: timestamp("updated_at")
      .default(sql`Now()`)
      .onUpdateNow(),
  },
  (table) => [index("user_id_idx").on(table.user_id)]
);

export const role = mysqlTable("role", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 32 }).notNull(),
  created_at: timestamp("created_at").default(sql`Now()`),
  updated_at: timestamp("updated_at")
    .default(sql`Now()`)
    .onUpdateNow(),
});

export const admin = mysqlTable(
  "admin",
  {
    id: char("id", { length: 50 }).primaryKey(),
    username: varchar("username", { length: 50 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    email: varchar("email", { length: 128 }).notNull(),
    full_name: varchar("full_name", { length: 128 }).notNull(),
    is_active: boolean("is_active").default(true),
    role_id: int("role_id")
      .notNull()
      .references(() => role.id),
    created_at: timestamp("created_at").default(sql`Now()`),
    updated_at: timestamp("updated_at")
      .default(sql`Now()`)
      .onUpdateNow(),
  },
  (table) => [
    index("username_idx").on(table.username),
    index("email_idx").on(table.email),
  ]
);

export const size = mysqlTable("size", {
  id: int("id").autoincrement().primaryKey(),
  size_code: mysqlEnum(["S", "M", "L", "XL", "XXL"]).notNull(),
  product_id: int("product_id").references(() => product.id),
  stock: int("stock").notNull(),
  created_at: timestamp("created_at").default(sql`Now()`),
  updated_at: timestamp("updated_at")
    .default(sql`Now()`)
    .onUpdateNow(),
});

export const category = mysqlTable("category", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  created_at: timestamp("created_at").default(sql`Now()`),
  updated_at: timestamp("updated_at")
    .default(sql`Now()`)
    .onUpdateNow(),
});

export const product = mysqlTable(
  "product",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 128 }).notNull(),
    gender: mysqlEnum(["L", "P", "U"]).notNull(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    category_id: int("category_id")
      .notNull()
      .references(() => category.id),
    created_at: timestamp("created_at").default(sql`Now()`),
    updated_at: timestamp("updated_at")
      .default(sql`Now()`)
      .onUpdateNow(),
  },
  (table) => [index("name_idx").on(table.name)]
);

export const order = mysqlTable(
  "order",
  {
    id: int("id").autoincrement().primaryKey(),
    order_code: varchar("order_code", { length: 12 }).notNull(),
    user_id: char("user_id", { length: 50 })
      .notNull()
      .references(() => user.id),
    address_id: int("address_id")
      .notNull()
      .references(() => address.id),
    total_price: int("total_price").notNull(),
    status: tinyint("status").notNull(),
    is_cancelled: boolean("is_cancle").default(false),
    is_finish: boolean("is_finish").default(false),
    paid_at: timestamp("paid_at"),
    created_at: timestamp("created_at").default(sql`Now()`),
    updated_at: timestamp("updated_at")
      .default(sql`Now()`)
      .onUpdateNow(),
  },
  (table) => [
    index("order_code_idx").on(table.order_code),
    index("user_status_idx").on(table.user_id, table.status),
  ]
);

export const orderItem = mysqlTable("order_item", {
  id: int("id").autoincrement().primaryKey(),
  order_id: int("order_id")
    .notNull()
    .references(() => order.id),
  product_id: int("product_id")
    .notNull()
    .references(() => product.id),
  size_id: int("size_id")
    .notNull()
    .references(() => size.id),
  quantity: int("quantity").notNull(),
  created_at: timestamp("created_at").default(sql`Now()`),
  updated_at: timestamp("updated_at")
    .default(sql`Now()`)
    .onUpdateNow(),
});

export const session = mysqlTable(
  "session",
  {
    id: int("id").autoincrement().primaryKey(),
    user_id: char("user_id", { length: 50 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    user_agent: varchar("user_agent", { length: 255 }).notNull(),
    expired_at: timestamp("expired_at").notNull(),
    created_at: timestamp("created_at").default(sql`Now()`),
    last_used: timestamp("updated_at").default(sql`Now()`),
  },
  (table) => [
    index("token_idx").on(table.token),
    index("user_id_idx").on(table.user_id),
    index("user_find_idx").on(table.user_id, table.token),
  ]
);
