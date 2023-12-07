package controller

import (
	"net/http"

	"github.com/B6406325/team03/entity"
	"github.com/gin-gonic/gin"
)

func ListUser(c *gin.Context) {
	var users []entity.User
	if err := entity.DB().Raw("SELECT * FROM users").Scan(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

func ListMovies(c *gin.Context) {
	var movies []entity.Movie
	if err := entity.DB().Preload("Categories").Preload("Soundtrack").Preload("Target").Raw("SELECT * FROM movies").Find(&movies).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": movies})
}

func DeleteMovieById(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM movies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movie not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
