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
	id := c.Param("id")
	if err := entity.DB().Raw(
		`SELECT * from users where email =?`, id).Find(&UserInfo).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": UserInfo})
}

type upUser struct {
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
		c.JSON(http.StatusBadRequest, gin.H{"error1": err.Error()})
		return
	}

	// Look up the user by student_id
	if tx := entity.DB().Where("email = ?", userInfo.Email).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error2": "user not found"})
		return
	}

	// Update the student's information
	if err := entity.DB().Model(&entity.User{}).Where("email = ?", userInfo.Email).Updates(entity.User{
		Username:  userInfo.Username,
		Password:  userInfo.Password,
		Firstname: userInfo.Firstname,
		Lastname:  userInfo.Lastname,
		Address:   userInfo.Address,
		Dob:       userInfo.Dob,
	}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error3": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": userInfo})
}
