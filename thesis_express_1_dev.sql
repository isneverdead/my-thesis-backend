-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2022 at 10:58 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thesis_express_1_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE `criteria` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `weight_value` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `criteria`
--

INSERT INTO `criteria` (`id`, `name`, `weight_value`, `createdAt`, `updatedAt`) VALUES
(1, 'kriteria1', 10.9, '2022-02-27 12:55:26', '2022-02-27 12:55:26'),
(2, 'kriteria2', 10.9, '2022-02-27 12:55:34', '2022-02-27 12:55:34'),
(3, 'kriteria3', 10.9, '2022-02-27 12:55:40', '2022-02-27 12:55:40'),
(4, 'kriteria4', 10.9, '2022-02-27 12:55:44', '2022-02-27 12:55:44');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220227071322-create-user.js'),
('20220227102853-create-criteria.js'),
('20220227102952-create-sub-criteria.js'),
('20220227153616-create-time-table-used-by.js'),
('20220228150027-create-time-table-todo.js'),
('20220228150028-create-time-table-saved.js'),
('20220228150029-create-time-table-used.js'),
('20220228150030-create-time-table-rating.js'),
('20220228151438-create-time-table.js');

-- --------------------------------------------------------

--
-- Table structure for table `subcriteria`
--

CREATE TABLE `subcriteria` (
  `id` int(11) NOT NULL,
  `criteria_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `weight_value` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcriteria`
--

INSERT INTO `subcriteria` (`id`, `criteria_id`, `name`, `weight_value`, `createdAt`, `updatedAt`) VALUES
(7, 1, 'sub kriteria 1', 10, '2022-02-27 13:01:52', '2022-02-27 13:01:52'),
(8, 1, 'sub kriteria 2', 10, '2022-02-27 13:01:57', '2022-02-27 13:01:57'),
(9, 1, 'sub kriteria 3', 10, '2022-02-27 13:01:58', '2022-02-27 13:01:58'),
(10, 1, 'sub kriteria 4', 10, '2022-02-27 13:02:00', '2022-02-27 13:02:00'),
(11, 1, 'sub kriteria 5', 10, '2022-02-27 13:02:02', '2022-02-27 13:02:02'),
(12, 2, 'sub kriteria 1', 10, '2022-02-27 13:02:08', '2022-02-27 13:02:08'),
(13, 2, 'sub kriteria 2', 10, '2022-02-27 13:02:10', '2022-02-27 13:02:10');

-- --------------------------------------------------------

--
-- Table structure for table `timetables`
--

CREATE TABLE `timetables` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(20) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetables`
--

INSERT INTO `timetables` (`id`, `userId`, `title`, `published`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Mencari Uangs', 0, '2022-02-28 15:20:05', '2022-02-28 16:42:13'),
(2, 1, 'Melebihi batas', 0, '2022-02-28 15:20:05', '2022-02-28 15:20:05'),
(3, 2, 'Mencari Uang ke 2', 0, '2022-02-28 16:47:12', '2022-02-28 16:47:12'),
(4, 2, 'Mencari Uang ke 3', 0, '2022-02-28 16:47:19', '2022-02-28 16:47:19');

-- --------------------------------------------------------

--
-- Table structure for table `timetable_ratings`
--

CREATE TABLE `timetable_ratings` (
  `id` int(11) NOT NULL,
  `timetableId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `rate` int(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetable_ratings`
--

INSERT INTO `timetable_ratings` (`id`, `timetableId`, `userId`, `rate`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 5, '2022-02-28 15:07:03', '2022-02-28 18:10:59'),
(2, 2, 2, 4, '2022-02-28 15:07:03', '2022-02-28 15:07:03'),
(3, 2, 3, 5, '2022-02-28 15:07:03', '2022-02-28 15:07:03'),
(4, 2, 4, 3, '2022-02-28 15:24:46', '2022-02-28 15:24:46'),
(5, 2, 2, 4, '2022-02-28 15:24:46', '2022-02-28 15:24:46'),
(6, 2, 3, 5, '2022-02-28 15:24:46', '2022-02-28 15:24:46');

-- --------------------------------------------------------

--
-- Table structure for table `timetable_saveds`
--

CREATE TABLE `timetable_saveds` (
  `id` int(11) NOT NULL,
  `timetableId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetable_saveds`
--

INSERT INTO `timetable_saveds` (`id`, `timetableId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 2, 2, '2022-02-28 15:07:04', '2022-02-28 15:07:04'),
(2, 2, 3, '2022-02-28 15:07:04', '2022-02-28 15:07:04'),
(3, 2, 4, '2022-02-28 15:07:04', '2022-02-28 15:07:04'),
(4, 2, 2, '2022-02-28 15:24:47', '2022-02-28 15:24:47'),
(5, 2, 3, '2022-02-28 15:24:47', '2022-02-28 15:24:47'),
(6, 2, 4, '2022-02-28 15:24:47', '2022-02-28 15:24:47'),
(7, 3, 2, '2022-02-28 18:28:54', '2022-02-28 18:28:54');

-- --------------------------------------------------------

--
-- Table structure for table `timetable_todos`
--

CREATE TABLE `timetable_todos` (
  `id` int(11) NOT NULL,
  `timetableId` int(11) DEFAULT NULL,
  `activity` varchar(255) DEFAULT NULL,
  `startAt` datetime DEFAULT NULL,
  `endAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetable_todos`
--

INSERT INTO `timetable_todos` (`id`, `timetableId`, `activity`, `startAt`, `endAt`, `createdAt`, `updatedAt`) VALUES
(1, 3, 'Bangun Pagi', '2022-02-27 07:00:00', '2022-02-27 08:00:00', '2022-02-28 15:07:34', '2022-02-28 15:07:34'),
(2, 3, 'Makan Pagi', '2022-02-27 08:00:01', '2022-02-27 09:00:00', '2022-02-28 15:07:34', '2022-02-28 15:07:34'),
(3, 3, 'Kerja', '2022-02-27 09:00:01', '2022-02-27 10:00:00', '2022-02-28 15:07:34', '2022-02-28 15:07:34'),
(4, 3, 'istirahat', '2022-02-27 10:00:01', '2022-02-27 15:00:00', '2022-02-28 15:07:34', '2022-02-28 15:07:34'),
(5, 3, 'Kerja lagi', '2022-02-27 15:00:01', '2022-02-27 17:00:00', '2022-02-28 15:07:34', '2022-02-28 15:07:34'),
(6, 3, 'Pulang', '2022-02-27 17:00:01', '2022-02-27 18:00:00', '2022-02-28 15:07:34', '2022-02-28 15:07:34'),
(7, 3, 'bobo', '2022-02-27 19:00:01', '2022-02-27 23:00:00', '2022-02-28 15:07:34', '2022-02-28 17:57:31'),
(9, 2, 'Bangun Pagi', '2022-02-27 07:00:00', '2022-02-27 08:00:00', '2022-02-28 15:21:52', '2022-02-28 15:21:52'),
(10, 2, 'Makan Pagi', '2022-02-27 08:00:01', '2022-02-27 09:00:00', '2022-02-28 15:21:52', '2022-02-28 15:21:52'),
(11, 2, 'Kerja', '2022-02-27 09:00:01', '2022-02-27 10:00:00', '2022-02-28 15:21:52', '2022-02-28 15:21:52'),
(12, 2, 'istirahat', '2022-02-27 10:00:01', '2022-02-27 15:00:00', '2022-02-28 15:21:52', '2022-02-28 15:21:52'),
(13, 2, 'Kerja lagi', '2022-02-27 15:00:01', '2022-02-27 17:00:00', '2022-02-28 15:21:52', '2022-02-28 15:21:52'),
(14, 2, 'Pulang', '2022-02-27 17:00:01', '2022-02-27 18:00:00', '2022-02-28 15:21:52', '2022-02-28 15:21:52'),
(15, 2, 'Makan malam', '2022-02-27 18:00:01', '2022-02-27 19:00:00', '2022-02-28 15:21:52', '2022-02-28 15:21:52'),
(16, 2, 'Tidur', '2022-02-27 19:00:01', '2022-02-27 23:00:00', '2022-02-28 15:21:52', '2022-02-28 15:21:52');

-- --------------------------------------------------------

--
-- Table structure for table `timetable_useds`
--

CREATE TABLE `timetable_useds` (
  `id` int(11) NOT NULL,
  `timetableId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetable_useds`
--

INSERT INTO `timetable_useds` (`id`, `timetableId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 2, 2, '2022-02-28 15:07:06', '2022-02-28 15:07:06'),
(2, 2, 3, '2022-02-28 15:07:06', '2022-02-28 15:07:06'),
(3, 2, 4, '2022-02-28 15:07:06', '2022-02-28 15:07:06'),
(4, 2, 2, '2022-02-28 15:24:48', '2022-02-28 15:24:48'),
(5, 2, 3, '2022-02-28 15:24:48', '2022-02-28 15:24:48'),
(6, 2, 4, '2022-02-28 15:24:48', '2022-02-28 15:24:48');

-- --------------------------------------------------------

--
-- Table structure for table `timetable_used_by`
--

CREATE TABLE `timetable_used_by` (
  `id` int(11) NOT NULL,
  `timetable_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetable_used_by`
--

INSERT INTO `timetable_used_by` (`id`, `timetable_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 2, 2, '2022-02-27 19:13:00', '2022-02-27 19:13:00'),
(2, 2, 3, '2022-02-27 19:13:00', '2022-02-27 19:13:00'),
(3, 2, 4, '2022-02-27 19:13:00', '2022-02-27 19:13:00'),
(4, 2, 2, '2022-02-27 19:36:45', '2022-02-27 19:36:45'),
(5, 2, 3, '2022-02-27 19:36:45', '2022-02-27 19:36:45'),
(6, 2, 4, '2022-02-27 19:36:45', '2022-02-27 19:36:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `job` varchar(15) DEFAULT NULL,
  `target` varchar(15) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `role` int(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `job`, `target`, `gender`, `birthday`, `profile_url`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'akbar', 'akbar@local.com', '12345', NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-27 12:55:09', '2022-02-27 12:55:09'),
(2, 'user 1', 'user1@local.com', '12345', NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-27 16:21:34', '2022-02-27 16:21:34'),
(3, 'user 2', 'user2@local.com', '12345', NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-27 16:21:34', '2022-02-27 16:21:34'),
(4, 'user 3', 'user3@local.com', '12345', NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-27 16:21:34', '2022-02-27 16:21:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `subcriteria`
--
ALTER TABLE `subcriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetables`
--
ALTER TABLE `timetables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetable_ratings`
--
ALTER TABLE `timetable_ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetable_saveds`
--
ALTER TABLE `timetable_saveds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetable_todos`
--
ALTER TABLE `timetable_todos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetable_useds`
--
ALTER TABLE `timetable_useds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetable_used_by`
--
ALTER TABLE `timetable_used_by`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subcriteria`
--
ALTER TABLE `subcriteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `timetables`
--
ALTER TABLE `timetables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `timetable_ratings`
--
ALTER TABLE `timetable_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `timetable_saveds`
--
ALTER TABLE `timetable_saveds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `timetable_todos`
--
ALTER TABLE `timetable_todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `timetable_useds`
--
ALTER TABLE `timetable_useds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `timetable_used_by`
--
ALTER TABLE `timetable_used_by`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
