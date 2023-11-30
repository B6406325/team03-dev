package entity

import (
	"time"

	"gorm.io/gorm"
)

type Movie struct {
	gorm.Model
	Title       string
	Duration    string
	Description string
	ReleaseDate time.Time
	Director    string
	Cast        string
	Image       string
	Video       string

	CategoriesID *uint
	Categories   Categories `gorm:"references:id"`

	SoundtrackID *uint
	Soundtrack   Soundtrack `gorm:"references:id"`

	TargetID *uint
	Target   Target `gorm:"references:id"`

	Review         []Review         `gorm:"foreignKey:MovieID"`
	History        []History        `gorm:"foreignKey:MovieID"`
	Download       []Download       `gorm:"foreignKey:MovieID"`
	WatchlistMovie []WatchlistMovie `gorm:"foreignKey:MovieID"`
}

type Target struct {
	gorm.Model
	Target string

	Movie []Movie `gorm:"foreignKey:TargetID"`
}

type Soundtrack struct {
	gorm.Model
	Soundtrack string

	Movie []Movie `gorm:"foreignKey:SoundtrackID"`
}

type Categories struct {
	gorm.Model
	Categories string

	Movie []Movie `gorm:"foreignKey:CategoriesID"`
}
