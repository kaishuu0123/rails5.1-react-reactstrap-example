class CreateStrictTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :strict_tasks do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
