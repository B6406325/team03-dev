package controller

import (
	"fmt"
	"net/http"

	"github.com/B6406325/team03/entity"
	"github.com/gin-gonic/gin"
)

func GetUserToLogin(c *gin.Context) {
	email := c.Param("email")
	password := c.Param("password")

	var user entity.User
	err := entity.DB().Preload("StatusUser").Raw("SELECT * FROM users WHERE email = ?", email).Find(&user).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} else {
		if email != user.Email {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email Not found"})
			return
		} else {
			if password != user.Password {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid password"})
				return
			} else {
				if user.StatusUser.Status == "admin" {
					fmt.Println("admin")
					c.JSON(http.StatusOK, gin.H{"data": "Status admin"})
					return
				}
				c.JSON(http.StatusOK, gin.H{"data": user})
				fmt.Println("user")
				return
			}
		}
	}
}

func CreateUser(c *gin.Context) {
	var user entity.User
	var gender entity.Gender
	var prefix entity.Prefix
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", user.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", user.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	u := entity.User{
		Gender:       gender,
		Prefix:       prefix,
		Username:     user.Username,
		Email:        user.Email,
		Password:     user.Password,
		Firstname:    user.Firstname,
		Lastname:     user.Lastname,
		Dob:          user.Dob,
		StatusUserID: user.StatusUserID,
		GenderID:     user.GenderID,
		PrefixID:     user.PrefixID,
	}

	if err := entity.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": u})
}

func ListGenders(c *gin.Context) {
	var genders []entity.Gender
	if err := entity.DB().Raw("SELECT * FROM genders").Scan(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": genders})
}

func ListPrefix(c *gin.Context) {
	var prefix []entity.Prefix
	if err := entity.DB().Raw("SELECT * FROM Prefixes").Scan(&prefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prefix})
}
