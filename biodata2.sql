-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 22 Sep 2017 pada 04.31
-- Versi Server: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biodata2`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `biodata2`
--

CREATE TABLE `biodata2` (
  `idBiodata` int(11) NOT NULL,
  `namaDepan` varchar(20) DEFAULT NULL,
  `namaBelakang` varchar(20) DEFAULT NULL,
  `jenisKelamin` varchar(20) DEFAULT NULL,
  `alamat` varchar(20) DEFAULT NULL,
  `noTelp` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `biodata2`
--

INSERT INTO `biodata2` (`idBiodata`, `namaDepan`, `namaBelakang`, `jenisKelamin`, `alamat`, `noTelp`, `email`) VALUES
(1, 'wak', 'wak', 'wak', 'wak', 'wak', 'wak'),
(3, 'Semoga Jadi', 'awk', 'wak', 'wak', 'wak', 'wak'),
(4, 'heiho', 'asdlk', 'sdlkn', 'asdkn', 'asdlkn', 'asdlkn');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `biodata2`
--
ALTER TABLE `biodata2`
  ADD PRIMARY KEY (`idBiodata`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `biodata2`
--
ALTER TABLE `biodata2`
  MODIFY `idBiodata` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
