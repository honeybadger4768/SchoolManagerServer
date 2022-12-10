-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: SchoolManager
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Announcements`
--

DROP TABLE IF EXISTS `Announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Announcements` (
  `announcementId` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL DEFAULT '0',
  `announcementContent` text NOT NULL,
  `announcementImages` varchar(1400) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`announcementId`),
  UNIQUE KEY `announcementId_UNIQUE` (`announcementId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcements`
--

LOCK TABLES `Announcements` WRITE;
/*!40000 ALTER TABLE `Announcements` DISABLE KEYS */;
INSERT INTO `Announcements` VALUES (1,1,'merhaba','[]','2022-11-26 10:45:52'),(2,1,'merhaba 2','[]','2022-11-26 10:45:54'),(3,1,'merhaba dünya','[]','2022-11-26 10:45:54'),(4,1,'nasılsınız','[]','2022-11-26 10:45:58'),(5,1,'yarın okul var','[]','2022-11-26 10:46:00');
/*!40000 ALTER TABLE `Announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Auth`
--

DROP TABLE IF EXISTS `Auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Auth` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(126) NOT NULL,
  `permission` int NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'student',
  `number` int NOT NULL DEFAULT '0',
  `classId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `id_UNIQUE` (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Auth`
--

LOCK TABLES `Auth` WRITE;
/*!40000 ALTER TABLE `Auth` DISABLE KEYS */;
INSERT INTO `Auth` VALUES (1,'honey','b60eb83bf533eecf1bde65940925a981',3,'Furkan','Çetinkaya','student',123,1),(2,'honey2','b60eb83bf533eecf1bde65940925a981',1,'Öretmenim','Öretmen','staff',0,0);
/*!40000 ALTER TABLE `Auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CanteenList`
--

DROP TABLE IF EXISTS `CanteenList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CanteenList` (
  `canteenItemId` int NOT NULL AUTO_INCREMENT,
  `canteenItemName` varchar(75) NOT NULL,
  `canteenItemPrice` int NOT NULL,
  `itemImagePath` varchar(45) DEFAULT '/images/canteen/canteen.png',
  PRIMARY KEY (`canteenItemId`),
  UNIQUE KEY `canteenItemId_UNIQUE` (`canteenItemId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CanteenList`
--

LOCK TABLES `CanteenList` WRITE;
/*!40000 ALTER TABLE `CanteenList` DISABLE KEYS */;
INSERT INTO `CanteenList` VALUES (1,'simit',10,'/images/canteen/canteen.png'),(3,'sırma su',5,'/images/canteen/canteen.png');
/*!40000 ALTER TABLE `CanteenList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClassList`
--

DROP TABLE IF EXISTS `ClassList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClassList` (
  `classId` int NOT NULL AUTO_INCREMENT,
  `className` varchar(10) NOT NULL,
  `classTeacherId` int NOT NULL,
  `classDegree` int NOT NULL,
  `classBranch` varchar(1) NOT NULL,
  PRIMARY KEY (`classId`),
  UNIQUE KEY `classId_UNIQUE` (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClassList`
--

LOCK TABLES `ClassList` WRITE;
/*!40000 ALTER TABLE `ClassList` DISABLE KEYS */;
INSERT INTO `ClassList` VALUES (1,'12/D',2,12,'D'),(2,'10/A',3,10,'A');
/*!40000 ALTER TABLE `ClassList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Classes`
--

DROP TABLE IF EXISTS `Classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Classes` (
  `classId` int NOT NULL AUTO_INCREMENT,
  `className` varchar(100) NOT NULL,
  `imagePath` varchar(100) NOT NULL,
  PRIMARY KEY (`classId`),
  UNIQUE KEY `classId_UNIQUE` (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Classes`
--

LOCK TABLES `Classes` WRITE;
/*!40000 ALTER TABLE `Classes` DISABLE KEYS */;
INSERT INTO `Classes` VALUES (1,'matematik','/images/math.png');
/*!40000 ALTER TABLE `Classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExamResults`
--

DROP TABLE IF EXISTS `ExamResults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExamResults` (
  `resultId` int NOT NULL AUTO_INCREMENT,
  `examId` int NOT NULL DEFAULT '0',
  `studentNumber` int NOT NULL DEFAULT '0',
  `studentPoint` int NOT NULL DEFAULT '0',
  `classId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`resultId`),
  UNIQUE KEY `resultId_UNIQUE` (`resultId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExamResults`
--

LOCK TABLES `ExamResults` WRITE;
/*!40000 ALTER TABLE `ExamResults` DISABLE KEYS */;
INSERT INTO `ExamResults` VALUES (1,1,123,100,1);
/*!40000 ALTER TABLE `ExamResults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Exams`
--

DROP TABLE IF EXISTS `Exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Exams` (
  `examId` int NOT NULL AUTO_INCREMENT,
  `examName` varchar(100) NOT NULL,
  PRIMARY KEY (`examId`),
  UNIQUE KEY `examId_UNIQUE` (`examId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Exams`
--

LOCK TABLES `Exams` WRITE;
/*!40000 ALTER TABLE `Exams` DISABLE KEYS */;
INSERT INTO `Exams` VALUES (1,'1.dönem matematik 1.yazılı');
/*!40000 ALTER TABLE `Exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ParentAndStudent`
--

DROP TABLE IF EXISTS `ParentAndStudent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ParentAndStudent` (
  `informationId` int NOT NULL AUTO_INCREMENT,
  `senderId` int NOT NULL DEFAULT '0',
  `information` varchar(256) NOT NULL,
  `receiverDegree` int NOT NULL DEFAULT '0',
  `receiverNumber` int DEFAULT NULL,
  `receiverClassId` int DEFAULT NULL,
  `type` enum('class','student','branch') DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`informationId`),
  UNIQUE KEY `informationId_UNIQUE` (`informationId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ParentAndStudent`
--

LOCK TABLES `ParentAndStudent` WRITE;
/*!40000 ALTER TABLE `ParentAndStudent` DISABLE KEYS */;
INSERT INTO `ParentAndStudent` VALUES (5,1,'123 numaralı öğrenciye özel bir mesaj',0,123,NULL,'student','2022-11-29 17:41:25'),(6,1,'bütün 12. sınıflara özel bir mesaj',12,NULL,NULL,'class','2022-11-29 17:41:25'),(7,1,'12/D sınıfındaki öğrencilere özel bir mesaj',0,NULL,1,'branch','2022-11-29 17:41:25');
/*!40000 ALTER TABLE `ParentAndStudent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PdrAnnouncements`
--

DROP TABLE IF EXISTS `PdrAnnouncements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PdrAnnouncements` (
  `announcementId` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL DEFAULT '0',
  `announcementContent` text NOT NULL,
  `announcementImages` varchar(1400) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`announcementId`),
  UNIQUE KEY `announcementId_UNIQUE` (`announcementId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PdrAnnouncements`
--

LOCK TABLES `PdrAnnouncements` WRITE;
/*!40000 ALTER TABLE `PdrAnnouncements` DISABLE KEYS */;
INSERT INTO `PdrAnnouncements` VALUES (7,1,'yks hazırlık çalışmalarını aksatmayalım...','','2022-11-27 11:35:43');
/*!40000 ALTER TABLE `PdrAnnouncements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PdrService`
--

DROP TABLE IF EXISTS `PdrService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PdrService` (
  `pdrServiceId` int NOT NULL AUTO_INCREMENT,
  `studentId` int NOT NULL,
  `about` varchar(500) NOT NULL,
  `timeId` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`pdrServiceId`),
  UNIQUE KEY `pdrServiceId_UNIQUE` (`pdrServiceId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PdrService`
--

LOCK TABLES `PdrService` WRITE;
/*!40000 ALTER TABLE `PdrService` DISABLE KEYS */;
INSERT INTO `PdrService` VALUES (1,1,'dersler',1,'2028-11-20');
/*!40000 ALTER TABLE `PdrService` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudentVotes`
--

DROP TABLE IF EXISTS `StudentVotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StudentVotes` (
  `studentVoteId` int NOT NULL AUTO_INCREMENT,
  `studentId` int NOT NULL,
  `votingId` int NOT NULL,
  `studentAnswerIndex` int NOT NULL,
  PRIMARY KEY (`studentVoteId`),
  UNIQUE KEY `studentVoteId_UNIQUE` (`studentVoteId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudentVotes`
--

LOCK TABLES `StudentVotes` WRITE;
/*!40000 ALTER TABLE `StudentVotes` DISABLE KEYS */;
INSERT INTO `StudentVotes` VALUES (1,1,2,1);
/*!40000 ALTER TABLE `StudentVotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Votings`
--

DROP TABLE IF EXISTS `Votings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Votings` (
  `votingId` int NOT NULL AUTO_INCREMENT,
  `votingAuthorId` int NOT NULL,
  `votingTitle` varchar(450) NOT NULL,
  `votingOptions` varchar(1400) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`votingId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Votings`
--

LOCK TABLES `Votings` WRITE;
/*!40000 ALTER TABLE `Votings` DISABLE KEYS */;
INSERT INTO `Votings` VALUES (2,1,'yks ne durumda','[{\"key\":\"güzel\"},{\"key\":\"kötü\"}]','2022-11-27 13:52:39');
/*!40000 ALTER TABLE `Votings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WeeklySubjects`
--

DROP TABLE IF EXISTS `WeeklySubjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WeeklySubjects` (
  `subjectId` int NOT NULL AUTO_INCREMENT,
  `classId` int NOT NULL DEFAULT '0',
  `subject` varchar(100) NOT NULL,
  `senderId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`subjectId`),
  UNIQUE KEY `subjectId_UNIQUE` (`subjectId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WeeklySubjects`
--

LOCK TABLES `WeeklySubjects` WRITE;
/*!40000 ALTER TABLE `WeeklySubjects` DISABLE KEYS */;
INSERT INTO `WeeklySubjects` VALUES (1,1,'12D logaritma',1);
/*!40000 ALTER TABLE `WeeklySubjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishAndComplaint`
--

DROP TABLE IF EXISTS `WishAndComplaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishAndComplaint` (
  `formId` int NOT NULL AUTO_INCREMENT,
  `senderId` int NOT NULL,
  `content` varchar(256) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(45) NOT NULL DEFAULT 'wish',
  PRIMARY KEY (`formId`),
  UNIQUE KEY `formId_UNIQUE` (`formId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishAndComplaint`
--

LOCK TABLES `WishAndComplaint` WRITE;
/*!40000 ALTER TABLE `WishAndComplaint` DISABLE KEYS */;
INSERT INTO `WishAndComplaint` VALUES (1,1,'okul çok güzel','2022-11-27 07:18:25','wish'),(2,1,'okuı çok kötü','2022-11-27 07:18:52','complaint'),(3,1,'qweqwe','2022-11-27 08:37:34','complaint'),(4,1,'bu bir dilek mesajdr','2022-11-27 08:37:50','wish'),(5,1,'bu bir sikayet mesajdr','2022-11-27 08:39:49','complaint'),(6,1,'qwe','2022-11-27 08:44:51','wish'),(7,1,'z','2022-11-27 08:44:59','complaint'),(8,1,'sdgsdahsdjdfh','2022-11-27 15:15:57','wish'),(9,1,'qewrwe','2022-11-29 16:14:21','complaint');
/*!40000 ALTER TABLE `WishAndComplaint` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-10 15:01:52
