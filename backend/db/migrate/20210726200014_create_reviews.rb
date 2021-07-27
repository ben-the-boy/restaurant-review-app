class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :restaurant_id
      t.string :content
      t.integer :rating
      t.timestamps
    end
  end
end
