package controller

import (
	"net/http"
	"time"

	"github.com/B6406325/team03/entity"
	"github.com/gin-gonic/gin"
)

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
	if err := entity.DB().Preload("Gender").Preload("Prefix").Raw(
		`SELECT * FROM users WHERE id = ?`, userID).Find(&UserInfo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": UserInfo})
}

func GetUserPackageInfo(c *gin.Context) {
	var UserPackageInfo []entity.Package

	userID := c.Param("id")

	if err := entity.DB().Raw(`
        SELECT p.package_name, p.price, p.download_status, s.created_at
        FROM subscribes s
        INNER JOIN packages p ON p.id = s.package_id 
        WHERE s.user_id = ?`, userID).Scan(&UserPackageInfo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": UserPackageInfo})
}

func GetUserBill(c *gin.Context) {
	// Extract user ID from the request or wherever it's available
	userID := c.Param("id")

	var userBill []struct {
		entity.Payment
		Created time.Time
		Price        float64
		PackageName  string
		Bill         string
	}

	if err := entity.DB().Raw(`
		SELECT py.bill as Bill, p.price as Price, p.package_name as PackageName, py.created_at as Created
		FROM payments py
		INNER JOIN users u ON py.user_id = u.id
		INNER JOIN packages p ON py.package_id = p.id
		WHERE u.id = ?
	`, userID).Scan(&userBill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": userBill})
}



func CancelSubscription(c *gin.Context) {
	userID := c.Param("id")

	if err := entity.DB().Model(&entity.Subscribe{}).Where("user_id = ?", userID).Update("subscribe_status_id", 3).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Subscription cancelled successfully"})
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
	GenderID  *uint
	PrefixID  *uint
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
		GenderID:  userInfo.GenderID,
		PrefixID:  userInfo.PrefixID,
		Password:  userInfo.Password,
	}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User information updated successfully"})
}
