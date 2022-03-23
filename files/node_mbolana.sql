-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 23 mars 2022 à 21:50
-- Version du serveur : 10.7.3-MariaDB
-- Version de PHP : 8.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `node_mbolana`
--

-- --------------------------------------------------------

--
-- Structure de la table `nm_users`
--

CREATE TABLE `nm_users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('USER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `nm_users`
--

INSERT INTO `nm_users` (`id`, `firstname`, `lastname`, `email`, `password`, `role`) VALUES
(1, 'Eric', 'Rasolofonirina', 'ericseven.mg@gmail.com', '$2b$10$pmmL8unUqATd50Lk24WFs.t/WSTaDdgdxlcyzCP5YsqV3O/kIHDDW', 'ADMIN'),
(2, 'Test', 'Andrana', 'test@example.com', '$2b$10$1D5cHDZpSaZJyyQ0zVPt1em6OBgWeDUlTeB1N7hpdpzpCkbdytv1C', 'USER'),
(3, 'Abc', 'Def', 'abc@example.com', '$2b$10$txfeVVcZXmKJKrdFIotEY.TF2J7Z7k2YAiYn/0QtjCgLAeosZCuSm', 'USER');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `nm_users`
--
ALTER TABLE `nm_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `nm_users`
--
ALTER TABLE `nm_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
