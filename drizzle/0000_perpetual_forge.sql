CREATE TABLE `address` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` char(50) NOT NULL,
	`address` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now() ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin` (
	`id` char(50) NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(128) NOT NULL,
	`full_name` varchar(128) NOT NULL,
	`is_active` boolean DEFAULT true,
	`role_id` int NOT NULL,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now() ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admin_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now() ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_code` varchar(12) NOT NULL,
	`user_id` char(50) NOT NULL,
	`address_id` int NOT NULL,
	`total_price` int NOT NULL,
	`status` tinyint NOT NULL,
	`is_cancle` boolean DEFAULT false,
	`is_finish` boolean DEFAULT false,
	`paid_at` timestamp,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now() ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_item` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`product_id` int NOT NULL,
	`size_id` int NOT NULL,
	`quantity` int NOT NULL,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now() ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `order_item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`gender` enum('L','P','U') NOT NULL,
	`description` text NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`category_id` int NOT NULL,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now() ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now() ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `role_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` char(50) NOT NULL,
	`token` varchar(255) NOT NULL,
	`user_agent` varchar(255) NOT NULL,
	`expired_at` timestamp NOT NULL,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now(),
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `size` (
	`id` int AUTO_INCREMENT NOT NULL,
	`size_code` enum('S','M','L','XL','XXL') NOT NULL,
	`product_id` int,
	`stock` int NOT NULL,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now() ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `size_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` char(50) NOT NULL,
	`username` varchar(50) NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`email` varchar(128) NOT NULL,
	`phone` varchar(15),
	`password` text NOT NULL,
	`image` text,
	`is_active` boolean DEFAULT true,
	`is_deleted` boolean DEFAULT false,
	`created_at` timestamp DEFAULT Now(),
	`updated_at` timestamp DEFAULT Now() ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `address` ADD CONSTRAINT `address_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `admin` ADD CONSTRAINT `admin_role_id_role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_address_id_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_order_id_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_size_id_size_id_fk` FOREIGN KEY (`size_id`) REFERENCES `size`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `size` ADD CONSTRAINT `size_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `address` (`user_id`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `admin` (`username`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `admin` (`email`);--> statement-breakpoint
CREATE INDEX `order_code_idx` ON `order` (`order_code`);--> statement-breakpoint
CREATE INDEX `user_status_idx` ON `order` (`user_id`,`status`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `product` (`name`);--> statement-breakpoint
CREATE INDEX `token_idx` ON `session` (`token`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_find_idx` ON `session` (`user_id`,`token`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `user` (`username`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);