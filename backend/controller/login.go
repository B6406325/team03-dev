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
				if user.StatusUser.StatusName == "admin" {
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
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}