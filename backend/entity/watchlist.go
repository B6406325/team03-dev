package entity

import "gorm.io/gorm"

type Watchlist struct {
	gorm.Model

	UserID *uint
	User   User `gorm:"references:id"`

	WatchlistMovie []WatchlistMovie `gorm:"foreignKey:WatchlistID"`
}

type WatchlistMovie struct {
	gorm.Model
	Name string

	CategoriesWatchlistID *uint
	CategoriesWatchlist   CategoriesWatchlist `gorm:"references:id"`

	WatchlistID *uint
	Watchlist   Watchlist `gorm:"references:id"`

	ColorID *uint
	Color   Color `gorm:"references:id"`

	MovieID *uint
	Movie   Movie `gorm:"references:id"`
}

type CategoriesWatchlist struct {
	gorm.Model
	Categories string

	WatchlistMovie []WatchlistMovie `gorm:"foreignKey:CategoriesWatchlistID"`
}

type Color struct {
	gorm.Model
	Color string

	WatchlistMovie []WatchlistMovie `gorm:"foreignKey:ColorID"`
}
