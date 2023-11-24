package entity

import (
	"time"

	"gorm.io/gorm"
)

type UserHistory struct {
	gorm.Model
	Datetime time.Time

	UserID *uint
	User   User `gorm:"references:id"`

	MovieID *uint
	Movie   Movie `gorm:"references:id"`
}
