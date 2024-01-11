package entity

import (
	"time"

	"gorm.io/gorm"
)

type Movie struct {
	gorm.Model
	Title       string `gorm:"uniqueIndex" valid:"required~Title is required"`
	Duration    string `valid:"required~Duration is required"`
	Description string `valid:"required~Description is required, stringlength(1|250)"`
	ReleaseDate time.Time `valid:"required~ReleaseDate is required"`
	Director    string `valid:"required~Director is required"`
	Cast        string `valid:"required~Cast is required"`
	Image       string `gorm:"type:longtext" valid:"required~Image is required"`
	Video       string `valid:"required~Video is required"`

	CategoriesID *uint `valid:"required~Categories is required"`
	Categories   Categories `gorm:"references:id"`

	SoundtrackID *uint `valid:"required~Soundtrack is required"`
	Soundtrack   Soundtrack `gorm:"references:id"`

	TargetID *uint `valid:"required~Target is required"`
	Target   Target `gorm:"references:id"`

	Review         []Review         `gorm:"foreignKey:MovieID"`
	History        []History        `gorm:"foreignKey:MovieID"`
	Download       []Download       `gorm:"foreignKey:MovieID"`
	WatchlistMovie []WatchlistMovie `gorm:"foreignKey:MovieID"`
}

type Target struct {
	gorm.Model
	Target string `gorm:"uniqueIndex"`

	Movie []Movie `gorm:"foreignKey:TargetID"`
}

type Soundtrack struct {
	gorm.Model
	Soundtrack string `gorm:"uniqueIndex"`

	Movie []Movie `gorm:"foreignKey:SoundtrackID"`
}

type Categories struct {
	gorm.Model
	Categories string `gorm:"uniqueIndex"`

	Movie []Movie `gorm:"foreignKey:CategoriesID"`
}
