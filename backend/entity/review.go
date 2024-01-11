package entity

import (

	"gorm.io/gorm"
)

type Review struct {
	gorm.Model
	ReviewText string
	// DateTime   time.Time

	UserID *uint
	User   User `gorm:"references:id"`

	MovieID *uint
	Movie   Movie `gorm:"references:id"`

	RatingID *uint
	Rating   Rating `gorm:"references:id"`

	GenreID *uint
	Genre   Genre `gorm:"references:id"`

}

type Rating struct {
	gorm.Model
	RatingValue int `gorm:"uniqueIndex"`

	Review []Review `gorm:"foreignKey:RatingID"`
}

type Genre struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Review []Review `gorm:"foreignKey:GenreID"`
}

