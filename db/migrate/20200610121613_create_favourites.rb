class CreateFavourites < ActiveRecord::Migration[6.0]
  def change
    create_table :favourites do |t|
      t.string :job_id
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
