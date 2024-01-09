package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string `gorm:"uniqueIndex"`
	Email     string `gorm:"uniqueIndex" valid:"required~Email is required, email~Email is invalid"`
	Password  string `gorm:"uniqueIndex" valid:"required~Password is required, stringlength(4|4)"`
	Firstname string
	Lastname  string
	Address   string
	Dob       time.Time

	GenderID *uint  `valid:"required~Gender is required"`
	Gender   Gender `gorm:"references:id"`

	PrefixID *uint  `valid:"required~Prefix is required"`
	Prefix   Prefix `gorm:"references:id"`

	StatusUserID *uint
	StatusUser   StatusUser `gorm:"references:id"`

	Report    []Report    `gorm:"foreignKey:UserID"`
	Payment   []Payment   `gorm:"foreignKey:UserID"`
	Subscribe []Subscribe `gorm:"foreignKey:UserID"`
	Review    []Review    `gorm:"foreignKey:UserID"`
	History   []History   `gorm:"foreignKey:UserID"`
	Download  []Download  `gorm:"foreignKey:UserID"`
	Watchlist []Watchlist `gorm:"foreignKey:UserID"`
}

type Gender struct {
	gorm.Model
	Gender string `gorm:"uniqueIndex"`

	User []User `gorm:"foreignKey:GenderID"`
}

type Prefix struct {
	gorm.Model
	Prefix string `gorm:"uniqueIndex"`

	User []User `gorm:"foreignKey:PrefixID"`
}

type StatusUser struct {
	gorm.Model
	Status string `gorm:"uniqueIndex"`

	User []User `gorm:"foreignKey:StatusUserID"`
}
