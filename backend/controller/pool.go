package controller

import (
	"net/http"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/B6406325/team03/entity"
	"github.com/gin-gonic/gin"
)

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func GetPackageInfo(c *gin.Context) {
	var PackageInfo []entity.Package

	if err := entity.DB().Find(&PackageInfo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": PackageInfo})
}

func GetUserInfo(c *gin.Context) {
	var UserInfo []entity.User
	userID := c.Param("id")
	if err := entity.DB().Raw(
		`SELECT * FROM users WHERE id = ?`, userID).Find(&UserInfo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Raw(`
        SELECT users.*, genders.gender, prefixes.prefix
        FROM users
        LEFT JOIN genders ON users.gender_id = genders.id
        LEFT JOIN prefixes ON users.prefix_id = prefixes.id
        WHERE users.id = ?`, userID).Find(&UserInfo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": UserInfo})
}

type upUser struct {
	ID        uint
	Username  string
	Email     string
	Password  string
	Firstname string
	Lastname  string
	Address   string
	Dob       time.Time
}

func PatchUserInfo(c *gin.Context) {
	var userInfo upUser
	var result entity.User

	if err := c.ShouldBindJSON(&userInfo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad Request", "details": "Additional error information"})
		return
	}

	// Look up the user by id
	if tx := entity.DB().Where("id = ?", userInfo.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// Update the user's information, excluding the password
	if err := entity.DB().Model(&entity.User{}).Where("id = ?", userInfo.ID).Updates(entity.User{
		Username:  userInfo.Username,
		Firstname: userInfo.Firstname,
		Lastname:  userInfo.Lastname,
		Address:   userInfo.Address,
		Dob:       userInfo.Dob,
	}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the entered current password matches the stored password
	passwords := strings.Split(userInfo.Password, ":")
	if len(passwords) != 2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid password format"})
		return
	}

	currentPassword := passwords[0]
	newPassword := passwords[1]

	// Check if the entered current password matches the stored password
	if err := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(currentPassword)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Incorrect current password"})
		return
	}

	// Check if a new password is provided and update the password if necessary
	if newPassword != "" {
		hashedPassword, err := hashPassword(newPassword)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to hash the password", "details": err.Error()})
			return
		}

		// Update the user's password
		if err := entity.DB().Model(&entity.User{}).Where("id = ?", userInfo.ID).Update("password", hashedPassword).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update password", "details": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "User information updated successfully"})
}


func GetGenderType(c *gin.Context) {
	var gender entity.Gender
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT g.gender FROM Gender g INNER JOIN  users sd ON g.gender_id=sd.gender_id where sd.id=? ", id).Scan(&gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": gender})
}


func GetPrefixType(c *gin.Context) {
	var prefix entity.Prefix
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT p.prefix FROM Prefix p INNER JOIN  users sd ON p.prefix_id=sd.prefix_id where sd.id=? ", id).Scan(&prefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prefix})
}
