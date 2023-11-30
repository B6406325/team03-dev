package entity

import (
	"time"

	"gorm.io/gorm"
)

type Download struct {
	gorm.Model
	DownloadDate time.Time

	UserID *uint
	User   User `gorm:"references:id"`

	MovieID *uint
	Movie   Movie `gorm:"references:id"`
}
