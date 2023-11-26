package entity

import "gorm.io/gorm"

type Download struct {
	gorm.Model

	UserID *uint
	User   User `gorm:"references:id"`

	MovieID *uint
	Movie   Movie `gorm:"references:id"`
}