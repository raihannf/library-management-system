-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2024 at 06:37 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2204055_mraihannaufalfawwaz_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Table structure for table `peminjamanbuku_mraihannaufalfawwaz`
--

CREATE TABLE `peminjamanbuku_mraihannaufalfawwaz` (
  `id` int(11) NOT NULL,
  `judul_buku` text NOT NULL,
  `jumlah` int(11) NOT NULL,
  `nama_peminjam` text NOT NULL,
  `alamat_peminjam` text NOT NULL,
  `noHp_peminjam` text NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_pengembalian` date NOT NULL,
  `lama_pinjam` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `peminjamanbuku_mraihannaufalfawwaz`
--

INSERT INTO `peminjamanbuku_mraihannaufalfawwaz` (`id`, `judul_buku`, `jumlah`, `nama_peminjam`, `alamat_peminjam`, `noHp_peminjam`, `tanggal_pinjam`, `tanggal_pengembalian`, `lama_pinjam`) VALUES
(1, 'The Girl With the Dragon Tattoo', 2, 'Ajeng Pudjiastuti', 'Jln. Mangga Dua Raya No. 127', '081122334455', '2023-12-05', '2023-12-10', '5 hari'),
(2, 'Harry Potter and the Goblet of Fire', 1, 'Salwa Wahyuni', 'Jln. Tentara Pelajar No. 691', '081234567891', '2023-11-02', '2023-11-09', '7 hari'),
(3, 'Between the World and Me', 3, 'Simon Wacana', 'Jln. Acordion No. 7', '089876543210', '2023-12-17', '2023-12-21', '4 hari'),
(4, 'The Curious Incident of the Dog in the Night‑Time', 1, 'Gatra Latupono', 'Jln. Wahid Hasyim No. 233', '089182736455', '2024-01-01', '2024-01-03', '2 hari'),
(5, 'Tell Me How It Ends', 1, 'Valencia Kuncoro', 'Jln. Trunojoyo No. 39', '085546372819', '2024-01-02', '2024-01-06', '4 hari');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `peminjamanbuku_mraihannaufalfawwaz`
--
ALTER TABLE `peminjamanbuku_mraihannaufalfawwaz`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `peminjamanbuku_mraihannaufalfawwaz`
--
ALTER TABLE `peminjamanbuku_mraihannaufalfawwaz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
