package entity

import (
	"time"
	"gorm.io/gorm"
)

type Watchlist struct {
	gorm.Model
	Name string
	DateTime   time.Time

	UserID *uint
	User   User `gorm:"references:id"`

	CategoriesWatchlistID *uint
	CategoriesWatchlist   CategoriesWatchlist `gorm:"references:id"`

	ColorID *uint
	Color   Color `gorm:"references:id"`

	WatchlistMovie []WatchlistMovie `gorm:"foreignKey:WatchlistID"`
}

type WatchlistMovie struct {
	gorm.Model

	WatchlistID *uint
	Watchlist   Watchlist `gorm:"references:id"`

	MovieID *uint
	Movie   Movie `gorm:"references:id"`
}

type CategoriesWatchlist struct {
	gorm.Model
	Categories string

	Watchlist []Watchlist `gorm:"foreignKey:CategoriesWatchlistID"`
}

type Color struct {
	gorm.Model
	Color string

	Watchlist []Watchlist `gorm:"foreignKey:ColorID"`
}