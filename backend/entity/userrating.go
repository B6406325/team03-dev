package entity

import "gorm.io/gorm"

type UserRating struct {
	gorm.Model
	RatingValue int

	UserID *uint
	User   User `gorm:"references:id"`

	MovieID *uint
	Movie   Movie `gorm:"references:id"`
}
