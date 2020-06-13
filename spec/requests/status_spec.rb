require 'rails_helper'

RSpec.describe 'Status Requests' do

  describe 'Root path' do
    it 'Responds with 200' do
      get('/')
      expect(response.status).to eql(200)
    end
  end
  
end