package entity

import (
	"time"

	"gorm.io/gorm"
)

type Review struct {
	gorm.Model
	ReviewText string
	DateTime   time.Time

	UserID *uint
	User   User `gorm:"references:id"`

	MovieID *uint
	Movie   Movie `gorm:"references:id"`

	RatingID *uint
	Rating   Rating `gorm:"references:id"`

	GenreID *uint
	Genre   Genre `gorm:"references:id"`

	HasSpoilID *uint
	HasSpoil   HasSpoil `gorm:"references:id"`
}

type Rating struct {
	gorm.Model
	Ratingvalue int `gorm:"uniqueIndex"`

	Review []Review `gorm:"foreignKey:RatingID"`
}

type Genre struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Review []Review `gorm:"foreignKey:GenreID"`
}

type HasSpoil struct {
	gorm.Model
	IsSpoil bool

	Review []Review `gorm:"foreignKey:HasSpoilID"`
}
